package server

import pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"

type dockerbuildService struct {
  *pb.DockerService
}

func NewDockerBuild(content string) (*dockerbuild, error) {
  bld := &dockerbuild{
    data: content,
  }
  return bld, nil
}

func (d *dockerbuild) Archive() (io.Reader, error) {

}
