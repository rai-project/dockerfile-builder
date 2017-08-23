import FileType from "../../../thirdparty/filetype";
import mimoza from "mimoza";
import { isNil } from "lodash";

export default function detectFileTypeFactory(urlInput) {
  function detectFileType({ state, props, path, resolve }) {
    if (!resolve.isTag(urlInput, "state", "props")) {
      throw new Error(
        "Cerebral operator.detectFileType: You have to use the STATE or PROPS TAG as first argument and is a URL"
      );
    }

    const url = resolve.value(urlInput);
    return dataURLToBlob(url)
      .then(blobToBinaryString)
      .then(function(buf) {
        if (buf.type != "") {
          const type = buf.type;
          if (mimoza.isText(type) && path["text"]) {
            return path["text"]();
          }
        }
        const type = FileType(buf);
        if (isNil(type)) {
          return path.otherwise();
        }
        const ext = type.ext;
        return path[ext]
          ? path[ext]()
          : path.error({
              message: `the file type ${String(ext)} is not being handled`
            });
      })
      .catch(function(error) {
        return path.error({ error });
      });
  }

  detectFileType.displayName = `operator.detectFileType(${String(urlInput)})`;

  return detectFileType;
}
