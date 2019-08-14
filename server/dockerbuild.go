package server

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/fatih/color"
	"github.com/pkg/errors"
	"gopkg.in/mgo.v2/bson"

	"github.com/rai-project/aws"
	"github.com/rai-project/broker"
	"github.com/rai-project/broker/sqs"
	"github.com/rai-project/broker/rabbitmq"
	"github.com/rai-project/config"
	pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"
	"github.com/rai-project/model"
	"github.com/rai-project/pubsub"
	"github.com/rai-project/pubsub/redis"
	"github.com/rai-project/serializer/json"
	"github.com/rai-project/store"
	"github.com/rai-project/store/s3"
)

type dockerbuildService struct {
	awsSession *session.Session
}

var (
	colored = color.New(color.FgWhite, color.BgBlack)
	serverArch string
)

func SetServerArch(arch string) {
	serverArch = arch
}

func BuildCmd(imageName, content string) (err error) {
	colored = color.New()

	messages := make(chan string)

	go func() {
		for msg := range messages {
			fmt.Println(msg)
		}
	}()

	defer func() {
		if err != nil {
			log.WithError(err).Error("Got error when handling Build request")
		}
	}()

	req := &pb.DockerBuildRequest{
		Id:        bson.NewObjectId().Hex(),
		ImageName: imageName,
		Content:   content,
	}

	err = build(req, messages)

	return err

}

func UploadCmd(imageName, content string, userName string, password string) (err error) {
	colored = color.New()

	messages := make(chan string)

	go func() {
		for msg := range messages {
			fmt.Println(msg)
		}
	}()

	defer func() {
		if err != nil {
			log.WithError(err).Error("Got error when handling Build request")
		}
	}()

	req := &pb.DockerBuildRequest{
		Id:        bson.NewObjectId().Hex(),
		ImageName: imageName,
		Content:   content,
		PushOptions: &pb.PushOptions{
			Username: userName,
			Password: password,
			ImageName: imageName,
		},
	}

	err = build(req, messages)

	return err

}

func (service *dockerbuildService) Build(req *pb.DockerBuildRequest, srv pb.DockerService_BuildServer) (err error) {
	messages := make(chan string)
	if req.Id == "" || !bson.IsObjectIdHex(req.Id) {
		req.Id = bson.NewObjectId().Hex()
	}

	go func() {
		for msg := range messages {
			e := srv.Send(&pb.DockerBuildResponse{
				Id:      bson.NewObjectId().Hex(),
				Content: msg,
			})
			if e != nil {
				log.WithError(err).Error("Unable to write websocket message")
			}
		}
	}()

	defer func() {
		if err != nil {
			log.WithError(err).Error("Got error when handling Build request")
			e := srv.Send(&pb.DockerBuildResponse{
				Id: bson.NewObjectId().Hex(),
				Error: &pb.ErrorStatus{
					Message: err.Error(),
				}})
			if e != nil {
				log.WithError(err).Error("Unable to write websocket message")
			}
		}
	}()

	err = build(req, messages)

	return err
}

func build(req *pb.DockerBuildRequest, messages chan string) (err error) {
	id := req.Id

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Submitting your docker build")

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Processing submitted files")

	dec, err := base64.StdEncoding.DecodeString(req.Content)
	if err != nil {
		dec = []byte(req.Content)
	}

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Examining submitted files")

	gzipBytes, err := zipBytesToTarBz2(dec)
	if err != nil {
		return
	}

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Creating docker build session")
	var session *session.Session
	if serverArch == "s390x" {
		session, err = aws.NewSession(
			aws.Region(aws.AWSRegionUSEast1),
			aws.AccessKey(aws.Config.AccessKey),
			aws.SecretKey(aws.Config.SecretKey),
		)
	} else {
		// Create an AWS session
		session, err = aws.NewSession(
			aws.Region(aws.AWSRegionUSEast1),
			aws.AccessKey(aws.Config.AccessKey),
			aws.SecretKey(aws.Config.SecretKey),
			aws.Sts(id),
		)
	}
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

	messages <- colored.Add(color.FgGreen).Sprintf("✱") + colored.Sprintf(" Uploading docker build session")

	uploadKey := Config.UploadDestinationDirectory + "/" + id + ".tar.gz"

	uploadKey, err = st.UploadFrom(
		bytes.NewReader(gzipBytes),
		uploadKey,
		s3.Lifetime(time.Hour),
		store.UploadMetadata(map[string]interface{}{
			"id":         req.Id,
			"type":       "dockerfile-builder",
			"created_at": time.Now(),
		}),
		s3.ContentType("application/x-gzip"),
		store.UploadProgressOutput(nil),
	)
	if err != nil {
		return
	}

	pushOpts := req.GetPushOptions()
	if pushOpts == nil {
		pushOpts = &pb.PushOptions{}
	}
	pushParams := &model.Push{
		Push: pushOpts != nil &&
			pushOpts.GetImageName() != "" &&
			pushOpts.GetUsername() != "" &&
			pushOpts.GetPassword() != "",
		ImageName: pushOpts.GetImageName(),
		Credentials: model.DockerHubCredentials{
			Username: pushOpts.GetUsername(),
			Password: pushOpts.GetPassword(),
		},
	}

	var resources model.Resources
	if serverArch == "s390x" {
		resources = model.Resources{
			CPU: model.CPUResources{
				Architecture: "s390x",
			},
		}
	} else {
		resources = model.Resources{
			CPU: model.CPUResources{
				Architecture: "ppc64le",
			},
		}
	}
	buildSpec := model.BuildSpecification{
		RAI: model.RAIBuildSpecification{
			Version:        "0.2",
			ContainerImage: "",
		},
		Resources: resources,
		Commands: model.CommandsBuildSpecification{
			BuildImage: &model.BuildImageSpecification{
				ImageName:  req.GetImageName(),
				Dockerfile: "./Dockerfile",
				NoCache:    true,
				Push:       pushParams,
			},
		},
	}


	serializer := json.New()
	jobRequest := model.JobRequest{
		ID:        bson.ObjectIdHex(req.Id),
		Base: model.Base{
			CreatedAt: time.Now(),
		},
		ClientVersion:      config.App.Version,
		UploadKey:          uploadKey,
		BuildSpecification: buildSpec,
	}

	body, err := serializer.Marshal(jobRequest)
	if err != nil {
		return err
	}

	var brkr broker.Broker
	if serverArch == "s390x" {
		brkr = rabbitmq.New(
			rabbitmq.QueueName(Config.BrokerQueueName),
			broker.Serializer(serializer),
		)
	} else {
		brkr, err = sqs.New(
			sqs.QueueName(Config.BrokerQueueName),
			broker.Serializer(serializer),
			sqs.Session(session),
		)
	}
	if err != nil {
		return err
	}
	brkr.Connect()
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

	subscribeChannel := raiAppName + "/log-" + req.Id
	subscriber, err := redis.NewSubscriber(redisConn, subscribeChannel)
	if err != nil {
		return errors.Wrap(err, "cannot create redis subscriber")
	}

	err = resultHandler(messages, subscriber.Start())
	return
}

func resultHandler(target chan string, msgs <-chan pubsub.Message) error {
	formatPrint := func(resp model.JobResponse) {
		body := strings.TrimSpace(string(resp.Body))
		if body == "" {
			return
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
