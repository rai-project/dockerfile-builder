import { trimStart, map, zipObject, keys, values, head } from "lodash";
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
    const fileName = basename(head(names));
    return {
      content: zipObject([fileName], values(content)),
      prefix: "todo/add/me"
    };
  }

  const prefix = common(names);
  const newNames = map(names, n => trimStart(n, prefix));

  return {
    content: zipObject(newNames, values(content)),
    prefix: prefix
  };
}
