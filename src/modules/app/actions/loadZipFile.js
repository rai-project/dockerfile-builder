import JSZip from "jszip";
import gitignorer from "gitignore-parser";
import { keys, zipWith } from "lodash";

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

const ignorer = gitignorer.compile(defaultGitIgnore);

export default function loadZipFile({ path, props: { input } }) {
  let fileNames = [];
  return JSZip.loadAsync(input)
    .then(function(zip) {
      fileNames = keys(zip.files).filter(ignorer.accepts);
      fileNames = fileNames.filter(fileName => !zip.files[fileName].dir);
      return Promise.all(
        fileNames.map(fileName => zip.file(fileName).async("string"))
      );
    })
    .then(function(contents) {
      const content = zipWith(fileNames, contents, (name, content) => {
        return {
          name,
          content
        };
      });
      return path.success({ content });
    })
    .catch(function(error) {
      console.log({ error });
      return path.error({
        error: {
          message: error.message,
          stack: error.stack
        }
      });
    });
}
