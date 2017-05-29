import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";

import uuid from "uuid";
import { Terminal as Term } from "react-term";
import DockerCommands from "../DockerCommands";

import "./styles.css";

export default connect(
  { terminalOutput: state`app.terminalOutput` },
  function Terminal({ terminalOutput }) {
    const c = <Term name={"terminal"} commandClass={DockerCommands} />;
    console.log(c);
    return c;
  }
);
