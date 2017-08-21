// package: raiprojectcom.docker
// file: raiprojectcom/docker/build_service.proto

import * as raiprojectcom_docker_build_service_pb from "../../raiprojectcom/docker/build_service_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
export class DockerService {
  static serviceName = "raiprojectcom.docker.DockerService";
}
export namespace DockerService {
  export class Build {
    static readonly methodName = "Build";
    static readonly service = DockerService;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = raiprojectcom_docker_build_service_pb.DockerBuildRequest;
    static readonly responseType = raiprojectcom_docker_build_service_pb.DockerBuildResponse;
  }
}
