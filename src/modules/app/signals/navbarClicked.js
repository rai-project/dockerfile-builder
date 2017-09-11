import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import resetError from "../chains/resetError";

export default [...resetError, set(state`app.currentPage`, props`name`)];
