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
  devtools: process.env.NODE_ENV === "production"
    ? null
    : Devtools({
        // If running standalone debugger. Some environments
        // might require 127.0.0.1 or computer IP address
        remoteDebugger: "localhost:8585",

        // By default the devtools tries to reconnect
        // to debugger when it can not be reached, but
        // you can turn it off
        reconnect: true
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
  providers: [
    // FirebaseProvider({
    // 	config: config.firebaseConfig,
    // }),
    ContextProvider({ uuid }),
    HttpProvider()
  ]
});

export default controller;
