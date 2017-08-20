import React from "react";

import { keys, pick } from "lodash";

import JSZip from "jszip";
import gitignorer from "gitignore-parser";

import base64ToBlob from "../../common/base64ToBlob";

// eslint-disable-next-line import/no-webpack-loader-syntax
import zipFileContent from "!base64-loader!../../_fixtures/test1.zip";

import Editor from "../Editor";
import Terminal from "../Terminal";
import UploadArea from "../UploadArea";

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

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

async function getFiles(zipFileContent) {
  const data = blobToFile(base64ToBlob(zipFileContent), "upload.zip");
  console.log(data);
  const zipFile = await JSZip.loadAsync(data);

  const ignorer = gitignorer.compile(defaultGitIgnore);

  let files = zipFile.files;
  const fileNames = keys(files).filter(ignorer.accepts);
  files = pick(files, fileNames);

  console.log(files["test_folder/file4.cu"]._data);
  // console.log(await zipFile.file("test_folder/file4.cu").async("string"));

  let res = {};
  for (const fileName in files) {
    const file = files[fileName];
    if (file.dir) {
      res[fileName] = {
        content: {},
        ...file
      };
      continue;
    }
    res[fileName] = {
      content: await zipFile.file(fileName).async("string"),
      ...file
    };
  }

  console.log(res);

  return res;
}

export default function Home() {
  // const files = getFiles(zipFileContent);
  return (
    <div>
      {/* <UploadArea />
        <Editor files={files} withMenuBar={true} currentFile={"test_folder/Dockerfile"} />
      */}
      <Editor />
      <Terminal />
    </div>
  );
}
