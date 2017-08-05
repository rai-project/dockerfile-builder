import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import React from "react";

import Editor from "../Editor";
import Terminal from "../Terminal";

export default function Home() {
  return (
    <div>
      <Editor />
      <Terminal />
    </div>
  );
}
