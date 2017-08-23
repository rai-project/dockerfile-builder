import { dataURLToBlob } from "blob-util";

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

export default function fromTextFile({ uuid, path, props: { file } }) {
  return dataURLToBlob(file.url)
    .then(blobToText)
    .then(function(content) {
      return path.success({
        content: {
          Dockerfile: {
            uuid: uuid(),
            content: content,
            createdOn: file.date,
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
