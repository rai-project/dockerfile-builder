import JSZip from "jszip";

export default function toZipFile({ path, props: { files } }) {
  let zip = new JSZip();
  for (const fileName in files) {
    const file = files[fileName];
    zip.file(fileName, file.content, {
      createFolders: true,
      date: file.updatedOn
    });
  }
  return zip
    .generateAsync({
      type: "base64",
      platform: "UNIX",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    })
    .then(base64 => path.success({ zip: base64 }))
    .catch(error =>
      path.error({
        error: {
          message: error.message,
          stack: error.stack
        }
      })
    );
}
