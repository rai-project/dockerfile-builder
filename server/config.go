package server

import (
	"github.com/k0kubun/pp"
	"github.com/rai-project/config"
	"github.com/rai-project/vipertags"
)

type dockerbuilderConfig struct {
	BrokerQueueName            string        `json:"broker_queue_name" config:"dockerbuilder.broker_queue_name" default:"rai_ppc64le_test"`
	UploadBucketName           string        `json:"upload_bucket" config:"dockerbuilder.upload_bucket" default:"files.rai-project.com"`
	UploadDestinationDirectory string        `json:"upload_destination_directory" config:"dockerbuilder.upload_destination_directory" default:"userdata"`
	done                       chan struct{} `json:"-" config:"-"`
}

var (
	Config = &dockerbuilderConfig{
		done: make(chan struct{}),
	}
	raiAppName = "rai"
)

func (dockerbuilderConfig) ConfigName() string {
	return "Dockerbuilder"
}

func (a *dockerbuilderConfig) SetDefaults() {
	vipertags.SetDefaults(a)
}

func (a *dockerbuilderConfig) Read() {
	defer close(a.done)
	vipertags.Fill(a)
}

func (c dockerbuilderConfig) Wait() {
	<-c.done
}

func (c dockerbuilderConfig) String() string {
	return pp.Sprintln(c)
}

func (c dockerbuilderConfig) Debug() {
	log.Debug("Dockerbuilder Config = ", c)
}

func init() {
	config.Register(Config)
}
