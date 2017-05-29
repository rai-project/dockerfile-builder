import { set, when } from "cerebral/operators";
import { state } from "cerebral/tags";

import submitCode from "../actions/submitCode";

export default [
  set(state`app.isBuilding`, true),
  set(state`app.terminalOutput`, []),
  submitCode
];
