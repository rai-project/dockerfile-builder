import { trimStart, map, zipObject, keys, values, head, initial, join } from "lodash";
import common from "common-prefix";

function basename(path) {
  return path.split("/").reverse()[0];
}

export default function removeZipRoot({ props: { content } }) {
  const names = keys(content);
  if (names.length === 0) {
    return;
  }
  if (names.length === 1) {
    const name = head(names);
    const fileName = basename(name);
    return {
      content: zipObject([fileName], values(content)),
      prefix:  join(initial(name.split("/")), "/"),
    };
  }

  const prefix = common(names);
  const newNames = map(names, n => trimStart(n, prefix));

  return {
    content: zipObject(newNames, values(content)),
    prefix: prefix
  };
}
