// package: raiprojectcom.docker
// file: raiprojectcom/docker/build_service.proto

import * as raiprojectcom_docker_build_service_pb from "../../raiprojectcom/docker/build_service_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
export class DockerService {
  static serviceName = "raiprojectcom.docker.DockerService";
}
export namespace DockerService {
  export class Build {
    static methodName = "Build";
    static service = DockerService;
    static requestStream = false;
    static responseStream = false;
    static requestType = raiprojectcom_docker_build_service_pb.DockerBuildRequest;
    static responseType = raiprojectcom_docker_build_service_pb.DockerBuildResponse;
  }
}
