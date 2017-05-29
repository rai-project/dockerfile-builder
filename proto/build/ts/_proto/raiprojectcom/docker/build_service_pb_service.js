// package: raiprojectcom.docker
// file: raiprojectcom/docker/build_service.proto

var jspb = require("google-protobuf");
var raiprojectcom_docker_build_service_pb = require("../../raiprojectcom/docker/build_service_pb");
var google_protobuf_any_pb = require("google-protobuf/google/protobuf/any_pb");
var DockerService = {
  serviceName: "raiprojectcom.docker.DockerService"
};
DockerService.Build = {
  methodName: "Build",
  service: DockerService,
  requestStream: false,
  responseStream: true,
  requestType: raiprojectcom_docker_build_service_pb.DockerBuildRequest,
  responseType: raiprojectcom_docker_build_service_pb.DockerBuildResponse
};
module.exports = {
  DockerService: DockerService
};
