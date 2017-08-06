import React from "react";

import { keys, pick } from "lodash";

import JSZip from "jszip";
import gitignorer from "gitignore-parser";

import base64ToBlob from "../../common/base64ToBlob";

// eslint-disable-next-line import/no-webpack-loader-syntax
import zipFileContent from "!base64-loader!../../_fixtures/test1.zip";

import Editor from "../Editor";
import Terminal from "../Terminal";

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

async function getFiles(zipFileContent) {
  const data = base64ToBlob(zipFileContent);
  const zipFile = await JSZip.loadAsync(data);

  const ignorer = gitignorer.compile(defaultGitIgnore);

  const files = zipFile.files;
  const fileNames = keys(files).filter(ignorer.accepts);
  const res = pick(files, fileNames);

  console.log(await zipFile.file("test_folder/file4.cu").async("string"));

  console.log(res);

  return res;
}

export default function Home() {
  const files = getFiles(zipFileContent);
  return (
    <div>
      <Editor files={files} />
      <Terminal />
    </div>
  );
}
