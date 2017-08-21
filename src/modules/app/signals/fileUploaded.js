import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

export default [
  set(state`app.terminal.visible`, false),
  set(state`app.upload.files`, props`files`)
];
