// import { merge, push, pop } from "cerebral/operators";
import { state, props } from "cerebral/tags";

export default [merge(state`app.terminalOutput`, props`content`)];
