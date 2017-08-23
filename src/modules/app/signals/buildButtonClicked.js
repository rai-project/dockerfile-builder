import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import onError from "../chains/onError";
import resetError from "../chains/resetError";

import buildImage from "../actions/buildImage";
import toZipFile from "../actions/toZipFile";

export default [
  ...resetError,
  set(state`app.state.building`, true),
  set(props`files`, state`app.files.content`),
  toZipFile,
  {
    success: [
      set(state`app.terminal.output`, []),
      set(state`app.terminal.visible`, true),
      buildImage
    ],
    error: onError
  },
  set(state`app.state.building`, false)
];
