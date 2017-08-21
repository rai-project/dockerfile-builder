import { grpc } from "grpc-web-client";

// Import code-generated data structures.
import { DockerService } from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb_service";
import {
  DockerBuildRequest
  // DockerBuildResponse,
  // ErrorStatus
} from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb";

function buildImage({ state, uuid, controller, props }) {
  const buildDockerRequest = new DockerBuildRequest();
  buildDockerRequest.setId(uuid.v4());
  buildDockerRequest.setContent(props.zip);
  grpc.invoke(DockerService.Build, {
    request: buildDockerRequest,
    host: "/api",
    onMessage: message => {
      state.push("app.terminal.output", message.toObject());
    },
    onEnd: (code, msg, trailers) => {
      state.set("app.isBuilding", false);
    }
  });
}

export default buildImage;
