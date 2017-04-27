import { Controller } from "cerebral";
import Devtools from "cerebral/devtools";

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
  state: {},
  signals: {}
});

export default controller;
