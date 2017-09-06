import { has } from "lodash";

export default function checkForDockerfile({ path, props: { content } }) {
  console.log({ content });
  if (has(content, "Dockerfile")) {
    return path.success();
  }

  return path.error({
    error: {
      message: "no dockerfile found",
      stack: []
    }
  });
}
