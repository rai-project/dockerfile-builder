import React from "react";
import { render } from "react-dom";
import controller from "./controller";
import { Container } from "cerebral/react";

import "semantic-ui-css/semantic.min.css";

import "./assets/fonts/lato-regular-webfont.woff";
import "./assets/fonts/lato-bold-webfont.woff";
import "./assets/fonts/glyphicons-halflings-regular.woff";

import registerServiceWorker from "./registerServiceWorker";

import App from "./components/App";

if (process.env.NODE_ENV !== "production") {
  const perf = async () => {
    window.Perf = await import("react-addons-perf");
  };
  perf();
}

render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.querySelector("#root")
);

if (process.env.NODE_ENV === "production") {
  registerServiceWorker();
}
