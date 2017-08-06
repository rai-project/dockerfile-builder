import { Controller } from "cerebral";
import Devtools from "cerebral/devtools";

import { ContextProvider } from "cerebral/providers";
import UseragentModule from "@cerebral/useragent";
import HttpProvider from "@cerebral/http";

import uuid from "uuid";

import app from "./modules/app";
import shortcuts from "./modules/shortcuts";

const controller = Controller({
  // You do not want to run the devtools in production as it
  // requires a bit of processing and memory to send data from
  // your application
  devtools:
    process.env.NODE_ENV === "production"
      ? null
      : Devtools({
          // Connect to Electron debugger (external debugger). It will
          // fall back to chrome extension if unable to connect
          host: "localhost:8585",

          // By default the devtools tries to reconnect
          // to debugger when it can not be reached, but
          // you can turn it off
          reconnect: true,

          // Time travel
          storeMutations: true,

          // Warnings on mutating outside "state" API
          preventExternalMutations: true,

          // Shows a warning when you have components with number of
          // state dependencies or signals above the set number
          bigComponentsWarning: 5,

          // In addition to these basic JavaScript types: Object, Array, String, Number
          // and Boolean, types of File, FileList, Blob, ImageData and RegExp is allowed to be stored in state
          // tree. You can add additional types if you know what you are doing :)
          allowedTypes: [File, Blob]
        }),
  modules: {
    app,
    shortcuts: shortcuts({
      "cmd+s": "app.saveClicked",
      "ctrl+s": "app.saveClicked"
    }),
    useragent: UseragentModule({
      media: {
        unsupported: "(max-width: 550px)",
        mobile: "(max-width: 700px)",
        desktop: "(min-width: 701px)"
      }
    })
  },
  providers: [ContextProvider({ uuid }), HttpProvider()]
});

export default controller;
