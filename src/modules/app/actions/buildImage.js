import { grpc } from "grpc-web-client";
import { isNil } from "lodash";

// Import code-generated data structures.
import { DockerService } from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb_service";
import {
  DockerBuildRequest,
  PushOptions
} from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb";

function buildImage({ state, uuid, controller, props }) {
  let { zip, imageName, pushOptions = {} } = props;
  imageName =
    imageName || pushOptions.imageName || "dockerbuilder/" + uuid.v4();
  const buildDockerRequest = new DockerBuildRequest();
  buildDockerRequest.setId(uuid.v4());
  buildDockerRequest.setImageName(imageName);
  buildDockerRequest.setContent(zip);
  if (!isNil(pushOptions)) {
    const opts = new PushOptions();
    opts.setImageName(imageName);
    opts.setUsername(pushOptions.username || "");
    opts.setPassword(pushOptions.password || "");
    buildDockerRequest.setPushOptions(opts);
  }
  grpc.invoke(DockerService.Build, {
    request: buildDockerRequest,
    host: "/api",
    onMessage: message => {
      state.push("app.terminal.output", message.toObject());
    },
    onEnd: (code, message, trailers) => {
      if (code && code !== 200) {
        state.set("app.error", { code, message });
      }
    }
  });
}

export default buildImage;
