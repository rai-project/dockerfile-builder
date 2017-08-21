import { set } from "cerebral/operators";
import { state } from "cerebral/tags";

export default [
  set(state`app.terminal.visible`, false),
  set(state`app.terminal.output`, [])
];
