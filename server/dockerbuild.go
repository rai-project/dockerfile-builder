package server

import pb "github.com/rai-project/dockerfile-builder/proto/build/go/_proto/raiprojectcom/docker"

type dockerbuildService struct {
  *pb.DockerServiceServer
}

func (service dockerbuildService)	Build(context.Context, *pb.DockerBuildRequest) (*pb.DockerBuildResponse, error){
  return nil, nil
}
