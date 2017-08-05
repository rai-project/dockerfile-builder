import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import React from "react";

import CodeMirror from "../CodeMirror";
import Terminal from "../Terminal";

export default function Home() {
  return (
    <div>
      <CodeMirror />
      <Terminal />
    </div>
  );
}
