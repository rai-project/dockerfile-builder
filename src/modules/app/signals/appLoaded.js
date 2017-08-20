import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import loadZipfile from "../actions/loadZipFile";
import removeZipRoot from "../actions/removeZipRoot";

import onError from "../../common/chains/onError";
import resetError from "../../common/chains/resetError";

export default [
  ...resetError,
  set(state`app.isLoaded`, false),
  loadZipfile,
  {
    success: [removeZipRoot, set(state`app.zipFile.content`, props`content`)],
    error: onError
  },
  set(state`app.isLoaded`, true)
];
