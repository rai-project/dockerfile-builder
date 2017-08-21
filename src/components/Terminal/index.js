import React from "react";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import ansi_up from "ansi_up";
import styled from "styled-components";

import "./themes/afterglow-theme.css";

const Line = styled.div`
  font-family: Roboto, Consolas, "Lucida Console", Monaco, "Courier New",
    Courier, monospace, serif;
  font-size: 0.8em;
  white-space: pre-wrap;
  line-height: 20px;
`;

const Term = styled.div`
  box-sizing: border-box;
  border-color: #202020;
  background-color: #202020;
  padding: 10px;
`;

export default connect(
  { output: state`app.terminal.output` },
  function Terminal({ output }) {
    if (output.length === 0) {
      return null;
    }

    const body = output.map(({ id, content }) => {
      const ansiup = new ansi_up();
      return (
        <Line
          key={id}
          dangerouslySetInnerHTML={{
            __html: ansiup.ansi_to_html(content, { use_classes: true })
          }}
        />
      );
    });
    return (
      <Term>
        <div className="afterglow-ansi-theme">
          {body}
        </div>
      </Term>
    );
  }
);
