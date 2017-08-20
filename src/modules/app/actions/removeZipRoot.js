import { trimStart, map } from "lodash";
import common from "common-prefix";

export default function removeZipRoot({ props: { content } }) {
  const names = map(content, "name");
  if (names.length <= 1) {
    return;
  }

  const prefix = common(names);

  return {
    content: content.map(e => {
      return {
        name: trimStart(e.name, prefix),
        content: e.content,
        prefix
      };
    })
  };
}
