import React from "react";
import createFragment from "react-addons-create-fragment";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";

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
    const body = terminalOutput.map(elem => {
      return (
        <div
          className="line"
          key={elem.id}
          dangerouslySetInnerHTML={{
            __html: ansi_up.ansi_to_html(elem.content, { use_classes: true })
          }}
        />
      );
    });
    return (
      <div className="ansiterm">
        <div className="tomorrow-night-eighties-ansi-theme">
          {body}
        </div>
      </div>
    );
  }
);
