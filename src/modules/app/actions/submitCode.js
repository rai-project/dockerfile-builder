// Import code-generated data structures.
import {
  DockerService
} from "../../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb_service";
import {
  DockerBuildRequest,
  DockerBuildResponse,
  ErrorStatus
} from "../../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb";

import { grpc, BrowserHeaders } from "grpc-web-client";

function submitCode({ state, uuid, controller, props }) {
  const buildDockerRequest = new DockerBuildRequest();
  buildDockerRequest.setId(uuid.v4());
  buildDockerRequest.setContent(props.codeEditorValue);
  grpc.invoke(DockerService.Build, {
    request: buildDockerRequest,
    host: "/api",
    onMessage: message => {
      state.push("app.terminalOutput", message.toObject());
    },
    onEnd: (code, msg, trailers) => {
      state.set("app.isBuilding", false);
    }
  });
}

export default submitCode;
