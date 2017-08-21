import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import fromZipFile from "../actions/fromZipFile";
import removeZipRoot from "../actions/removeZipRoot";

import onError from "../../common/chains/onError";
import resetError from "../../common/chains/resetError";

export default [
  ...resetError,
  set(state`app.state.uploading`, true),
  set(state`app.upload.visible`, false),
  set(state`app.upload.file`, props`file`),
  fromZipFile,
  {
    success: [
      removeZipRoot,
      set(state`app.files.content`, props`content`),
      set(state`app.files.prefix`, props`prefix`)
    ],
    error: onError
  },
  set(state`app.state.uploading`, false)
];
