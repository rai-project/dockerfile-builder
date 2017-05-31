import { merge } from "cerebral/operators";
import { state, props } from "cerebral/tags";

export default [merge(state`app.terminalOutput`, props`content`)];
