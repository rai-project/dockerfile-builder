import { set } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import fromZipFile from "../actions/fromZipFile";
import removeZipRoot from "../actions/removeZipRoot";

import onError from "../../common/chains/onError";
import resetError from "../../common/chains/resetError";

export default [
  ...resetError,
  set(state`app.isLoaded`, false),
  fromZipFile,
  {
    success: [
      removeZipRoot,
      set(state`app.files.content`, props`content`),
      set(state`app.files.prefix`, props`prefix`)
    ],
    error: onError
  },
  set(state`app.isLoaded`, true)
];
