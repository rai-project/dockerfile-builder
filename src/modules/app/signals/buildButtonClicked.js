import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import onError from "../../common/chains/onError";
import resetError from "../../common/chains/resetError";

import buildImage from "../actions/buildImage";
import toZipFile from "../actions/toZipFile";

export default [
  ...resetError,
  set(state`app.isBuilding`, true),
  set(props`files`, state`app.files.content`),
  toZipFile,
  {
    success: [set(state`app.terminalOutput`, []), buildImage],
    error: onError
  },
  set(state`app.isBuilding`, false)
];
