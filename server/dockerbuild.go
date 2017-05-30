package server

import (
	"bytes"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"text/template"
	"time"

	yaml "gopkg.in/yaml.v1"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/fatih/color"
	"github.com/gorilla/websocket"

	"github.com/pkg/errors"

	"github.com/docker/docker/builder/dockerfile/parser"
	"github.com/rai-project/archive"
	"github.com/rai-project/aws"
	"github.com/rai-project/broker"
	"github.com/rai-project/broker/sqs"
	"github.com/rai-project/config"
	pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"
	"github.com/rai-project/model"
	"github.com/rai-project/pubsub"
	"github.com/rai-project/pubsub/redis"
	"github.com/rai-project/serializer/json"
	"github.com/rai-project/store"
	"github.com/rai-project/store/s3"
	"github.com/rai-project/uuid"
)

type dockerbuildService struct {
	awsSession *session.Session
}

var (
	raiBuildTemplate *template.Template
	upgrader         = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	colored = color.New(color.FgWhite, color.BgBlack)
)

func (service *dockerbuildService) Build(req *pb.DockerBuildRequest, srv pb.DockerService_BuildServer) (err error) {

	messages := make(chan string)
	id := uuid.NewV4()

	go func() {
		for msg := range messages {

			e := srv.Send(&pb.DockerBuildResponse{
				Id:      uuid.NewV4(),
				Content: msg,
			})
			if e != nil {
				log.WithError(err).Error("Unable to write websocket message")
			}

		}
	}()

	defer func() {
		if err != nil {
			e := srv.Send(&pb.DockerBuildResponse{
				Id: uuid.NewV4(),
				Error: &pb.ErrorStatus{
					Message: err.Error(),
				}})
			if e != nil {
				log.WithError(err).Error("Unable to write websocket message")
			}
		}
	}()

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Submitting your docker build")

	// Create an AWS session
	session, err := aws.NewSession(
		aws.Region(aws.AWSRegionUSEast1),
		aws.AccessKey(aws.Config.AccessKey),
		aws.SecretKey(aws.Config.SecretKey),
		aws.Sts(id),
	)
	if err != nil {
		return
	}

	st, err := s3.New(
		s3.Session(session),
		store.Bucket(Config.UploadBucketName),
	)
	if err != nil {
		return
	}

	dockerfileContent := req.GetContent()
	if dockerfileContent == "" {
		err = errors.New("empty dockerfile")
		return
	}

	if err = validateDockerfile(dockerfileContent); err != nil {
		return
	}

	tempDir, err := ioutil.TempDir(config.App.TempDir, "dockerfile-builder-")
	if err != nil {
		return
	}

	defer os.RemoveAll(tempDir)

	dockerfilePath := filepath.Join(tempDir, "Dockerfile")
	if err = ioutil.WriteFile(dockerfilePath, []byte(dockerfileContent), 0644); err != nil {
		return
	}

	type raiBuildParams struct {
		ImageName string
	}

	buildSpec := model.BuildSpecification{
		RAI: model.RAIBuildSpecification{
			Version:        "2.0",
			ContainerImage: "",
		},
		Resources: model.Resources{
			CPU: model.CPUResources{
				Architecture: "ppc64le",
			},
		},
		Commands: model.CommandsBuildSpecification{
			BuildImage: &model.BuildImageSpecification{
				ImageName:  req.GetId(),
				Dockerfile: "./Dockerfile",
				NoCache:    true,
			},
		},
	}
	railBuildYmlContent, err := yaml.Marshal(buildSpec)
	if err != nil {
		return
	}
	railBuildYmlPath := filepath.Join(tempDir, "rai_build.yml")
	if err = ioutil.WriteFile(railBuildYmlPath, railBuildYmlContent, 0644); err != nil {
		return
	}

	zippedReader, err := archive.Zip(tempDir)
	if err != nil {
		return
	}
	defer zippedReader.Close()

	uploadKey := Config.UploadDestinationDirectory + "/" + filepath.Base(tempDir) + "." + archive.Extension()

	uploadKey, err = st.UploadFrom(
		zippedReader,
		uploadKey,
		s3.Lifetime(time.Hour),
		s3.Metadata(map[string]interface{}{
			"id":         req.Id,
			"type":       "dockerfile-builder",
			"created_at": time.Now(),
		}),
		s3.ContentType(archive.MimeType()),
		store.UploadProgressOutput(nil),
	)
	if err != nil {
		return
	}

	serializer := json.New()

	jobRequest := model.JobRequest{
		Base: model.Base{
			ID:        id,
			CreatedAt: time.Now(),
		},
		UploadKey:          uploadKey,
		BuildSpecification: buildSpec,
	}

	body, err := serializer.Marshal(jobRequest)
	if err != nil {
		return err
	}

	brkr, err := sqs.New(
		sqs.QueueName(Config.BrokerQueueName),
		broker.Serializer(serializer),
		sqs.Session(session),
	)
	if err != nil {
		return err
	}
	defer brkr.Disconnect()

	err = brkr.Publish(
		Config.BrokerQueueName,
		&broker.Message{
			ID: id,
			Header: map[string]string{
				"id":         id,
				"upload_key": uploadKey,
			},
			Body: body,
		},
	)
	if err != nil {
		return err
	}

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Uploaded your docker build request")

	redisConn, err := redis.New()
	if err != nil {
		return errors.Wrap(err, "cannot create a redis connection")
	}
	defer redisConn.Close()

	subscribeChannel := Config.BrokerQueueName + "/log-" + id
	subscriber, err := redis.NewSubscriber(redisConn, subscribeChannel)
	if err != nil {
		return errors.Wrap(err, "cannot create redis subscriber")
	}

	resultHandler(messages, subscriber.Start())

	return
}

func resultHandler(target chan string, msgs <-chan pubsub.Message) error {
	formatPrint := func(resp model.JobResponse) {
		body := strings.TrimSpace(string(resp.Body))
		if body == "" {
			return
		}
		if config.IsVerbose {
			target <- colored.Add(color.FgBlue).Sprintf("[ " + resp.CreatedAt.String() + "] ")
		}
		target <- colored.Sprintf(body)
	}
	for msg := range msgs {
		var data model.JobResponse

		err := msg.Unmarshal(&data)
		if err != nil {
			log.WithError(err).Debug("failed to unmarshal response data")
			continue
		}
		if data.Kind == model.StderrResponse || data.Kind == model.StdoutResponse {
			formatPrint(data)
		}
	}

	return nil
}

func validateDockerfile(content string) error {
	_, err := parser.Parse(bytes.NewReader([]byte(content)))
	return err
}
