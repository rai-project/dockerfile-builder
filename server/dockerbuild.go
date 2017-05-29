package server

import (
	"bytes"
	"io/ioutil"
	"os"
	"path/filepath"
	"text/template"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gorilla/websocket"

	"github.com/pkg/errors"

	"github.com/docker/docker/builder/dockerfile/parser"
	"github.com/rai-project/archive"
	"github.com/rai-project/aws"
	"github.com/rai-project/config"
	pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"
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
)

func NewDockerbuildService() *dockerbuildService {
	return &dockerbuildService{}
}

func (service *dockerbuildService) Build(req *pb.DockerBuildRequest, srv pb.DockerService_BuildServer) (err error) {

	messages := make(chan string)
	id := uuid.NewV4()

	go func() {
		for msg := range messages {

			e := srv.Send(&pb.DockerBuildResponse{
				Id:      id,
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
				Id: id,
				Error: &pb.ErrorStatus{
					Message: err.Error(),
				}})
			if e != nil {
				log.WithError(err).Error("Unable to write websocket message")
			}
		}
	}()

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

	railBuildYmlPath := filepath.Join(tempDir, "rai_build.yml")
	railBuildYmlContent := new(bytes.Buffer)
	if err = raiBuildTemplate.Execute(
		railBuildYmlContent,
		raiBuildParams{
			ImageName: req.GetId(),
		},
	); err != nil {
		return
	}
	if err = ioutil.WriteFile(railBuildYmlPath, railBuildYmlContent.Bytes(), 0644); err != nil {
		return
	}

	zippedReader, err := archive.Zip(tempDir)
	if err != nil {
		return
	}
	defer zippedReader.Close()

	uploadKey := Config.UploadDestinationDirectory + "/" + filepath.Base(tempDir) + "." + archive.Extension()

	key, err := st.UploadFrom(
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

	messages <- "✱ Uploaded your docker build with key = " + key

	// need to publish to queue

	return
}

func validateDockerfile(content string) error {
	_, err := parser.Parse(bytes.NewReader([]byte(content)))
	return err
}

func init() {

	raiBuildTemplateContent, err := _escFSString(false, "/server/rai_build.template")
	if err != nil {
		log.WithError(err).Fatal("cannot get /server/rai_build.template template file. make sure to run go generate on the main package.")
	}

	raiBuildTemplate, err = template.New("rai_build_template").Parse(raiBuildTemplateContent)
	if err != nil {
		log.WithError(err).Fatal("cannot parse /server/rai_build.template template file.")
	}
}
