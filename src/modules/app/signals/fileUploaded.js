import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import detectFileType from "../operators/detectFileType";

import fromZipFile from "../actions/fromZipFile";
import fromTextFile from "../actions/fromTextFile";
import removeZipRoot from "../actions/removeZipRoot";
import checkForDockerfile from "../actions/checkForDockerfile";

import onError from "../chains/onError";
import resetError from "../chains/resetError";

const onZipUpload = [
  fromZipFile,
  {
    success: [
      set(state`app.upload.files`, props`content`),
      removeZipRoot,
      checkForDockerfile,
      {
        success: [
          set(state`app.files.content`, props`content`),
          set(state`app.files.prefix`, props`prefix`)
        ],
        error: onError
      }
    ],
    error: onError
  }
];

const onTextUpload = [
  fromTextFile,
  {
    success: [
      set(state`app.upload.files`, props`content`),
      set(state`app.files.content`, props`content`),
      set(state`app.files.prefix`, ".")
    ],
    error: onError
  }
];

export default [
  ...resetError,
  set(state`app.state.uploading`, true),
  set(state`app.upload.visible`, false),
  set(state`app.upload.file`, props`file`),
  detectFileType(props`file.url`),
  {
    zip: onZipUpload,
    text: onTextUpload,
    otherwise: onTextUpload,
    error: onError
  },
  set(state`app.state.uploading`, false)
];
