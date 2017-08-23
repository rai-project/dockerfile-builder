import FileType from "../../../thirdparty/filetype";
import { dataURLToBlob, blobToBinaryString } from "blob-util";
import mimoza from "mimoza";
import { isNil, trimStart } from "lodash";

export default function detectFileTypeFactory(urlInput) {
  function detectFileType({ state, props, path, resolve }) {
    if (!resolve.isTag(urlInput, "props")) {
      throw new Error(
        "Cerebral operator.detectFileType: You have to use the STATE or PROPS TAG as first argument and is a URL"
      );
    }

    const url = resolve.value(urlInput);
    return dataURLToBlob(url)
      .then(function(blob) {
        if (blob.type !== "") {
          const type = blob.type;
          if (mimoza.isText(type) && path["text"]) {
            return path["text"]();
          }
          const ext = trimStart(mimoza.getExtension(type), ".");
          if (ext !== "" && path[ext]) {
            return path[ext]();
          }
        }
        return blobToBinaryString(blob).then(function(buf) {
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
        });
      })
      .catch(function(error) {
        return path.error({
          error: {
            message: error.message,
            stack: error.stack
          }
        });
      });
  }

  detectFileType.displayName = `operator.detectFileType(${String(urlInput)})`;

  return detectFileType;
}
