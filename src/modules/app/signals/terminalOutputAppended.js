import { merge } from "cerebral/operators";
import { state, props } from "cerebral/tags";

export default [merge(state`app.terminal.output`, props`content`)];
