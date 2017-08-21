import { trimStart, map, zipObject, keys, values } from "lodash";
import common from "common-prefix";

export default function removeZipRoot({ props: { content } }) {
  const names = keys(content);
  if (names.length <= 1) {
    return;
  }

  const prefix = common(names);
  const newNames = map(names, n => trimStart(n, prefix));

  return {
    content: zipObject(newNames, values(content)),
    prefix: prefix
  };
}
