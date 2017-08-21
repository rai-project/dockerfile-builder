import React from "react";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import ansi_up from "ansi_up";

// eslint-disable-next-line import/no-webpack-loader-syntax
import "./styles.css";
import "./afterglow-theme.css";

export default connect(
  { output: state`app.terminal.output` },
  function Terminal({ output }) {
    if (output.length === 0) {
      return null;
    }

    const body = output.map(({ id, content }) => {
      const ansiup = new ansi_up();
      return (
        <div
          className="line"
          key={id}
          dangerouslySetInnerHTML={{
            __html: ansiup.ansi_to_html(content, { use_classes: true })
          }}
        />
      );
    });
    return (
      <div className="ansiterm">
        <div className="afterglow-ansi-theme">
          {body}
        </div>
      </div>
    );
  }
);
