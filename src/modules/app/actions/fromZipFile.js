import JSZip from "jszip";
import gitignorer from "gitignore-parser";
import { keys, zipWith, values, pick, trimStart } from "lodash";
import { dataURLToBlob, blobToBinaryString } from "blob-util";

const defaultGitIgnore = `
.DS_Store
**/.DS_Store
.DS_Store?
.Trashes
ehthumbs.db
Thumbs.db
.Spotlight-V100
._*
__MACOSX
`;

const BLOB_PREFIX = "data:application/zip;base64,";
const ignorer = gitignorer.compile(defaultGitIgnore);

export default function fromZipFile({ uuid, path, props: { file } }) {
  let fileNames = [];
  let files = [];

  return dataURLToBlob(file.url)
    .then(blobToBinaryString)
    .then(buf =>
      JSZip.loadAsync(trimStart(buf, BLOB_PREFIX), {
        createFolders: true,
        base64: true
      })
    )
    .then(function(zip) {
      fileNames = keys(zip.files).filter(ignorer.accepts);
      fileNames = fileNames.filter(fileName => !zip.files[fileName].dir);
      files = pick(zip.files, fileNames);
      return Promise.all(
        fileNames.map(fileName => zip.file(fileName).async("string"))
      );
    })
    .then(function(contents) {
      let res = {};
      const fileObjects = values(files);
      zipWith(fileObjects, fileNames, contents, (file, fileName, content) => {
        res[fileName] = {
          uuid: uuid(),
          content: content,
          createdOn: file.date,
          updatedOn: new Date()
        };
      });
      return path.success({ content: res });
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
