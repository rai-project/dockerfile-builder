import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";

import uuid from "uuid";

import ansi_up from "ansi_up";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style!css!sass!./ansitheme.scss";
import "./styles.css";

// look at https://github.com/getsentry/freight/blob/master/static/components/TaskDetails.jsx

export default connect(
  { terminalOutput: state`app.terminalOutput` },
  function AnsiTerminal({ terminalOutput }) {
    if (terminalOutput.length === 0) {
      return null;
    }

    var frag = document.createDocumentFragment();
    terminalOutput.map(elem => {
      var div = document.createElement("div");
      div.className = "line";
      div.innerHTML = ansi_up.ansi_to_html(elem.content, { use_classes: true });
      frag.appendChild(div);
    });
    return (
      <div className="ansiterm">
        <div
          className="tomorrow-night-eighties-ansi-theme"
          ref={node => {
            node.appendChild(frag);
          }}
        />
      </div>
    );
  }
);
