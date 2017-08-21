import { set } from "cerebral/operators";
import { state } from "cerebral/tags";

import resetError from "../../common/chains/resetError";

export default [...resetError, set(state`app.state.loading`, false)];
