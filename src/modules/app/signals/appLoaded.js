import { set } from "cerebral/operators";
import { state } from "cerebral/tags";

import loadZipfile from "../actions/loadZipFile";

export default [
  set(state`app.isLoading`, true),
  loadZipfile,
  {
    success: [],
    error: []
  },
  set(state`app.isLoaded`, true)
];
