import "!style-loader!css-loader!./codeEditor.css";

import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import classnames from "classnames";
import CodeMirror from "codemirror";

import styles from "./styles.css";

import "codemirror/mode/dockerfile/dockerfile";

export default connect({}, function CodeEditor({}) {
  return <div><p>code editor</p></div>;
});
