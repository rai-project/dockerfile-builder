import { dataURLToBlob } from "blob-util";
import { trimStart } from "lodash";

function blobToText(blob) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onloadend = function(e) {
      var result = e.target.result || "";
      return resolve(result);
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

const BLOB_PREFIX = "data:text/plain;base64,";

export default function fromTextFile({ uuid, path, props: { file } }) {
  return dataURLToBlob(file.url)
    .then(blobToText)
    .then(function(buf) {
      const content = trimStart(buf, BLOB_PREFIX);
      return path.success({
        content: {
          Dockerfile: {
            uuid: uuid(),
            content: atob(content),
            createdOn: new Date(),
            updatedOn: new Date()
          }
        }
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
