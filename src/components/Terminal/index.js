import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import ansi_up from "ansi_up";
import styled from "styled-components";
import { Segment, Icon, Menu, Divider } from "semantic-ui-react";

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
  padding: 20px;
`;

const ansiup = new ansi_up();
ansiup.use_classes = true;

export default connect(
  { output: state`app.terminal.output`, onDismiss: signal`app.terminalClosed` },
  function Terminal({ output, onDismiss }) {
    if (output.length === 0) {
      return null;
    }

    const body = output.map(({ id, content }) => {
      if (content === "--DIVIDER--") {
        return <Divider />;
      }
      return (
        <Line
          key={id}
          dangerouslySetInnerHTML={{
            __html: ansiup.ansi_to_html(content)
          }}
        />
      );
    });
    return (
      <div>
        <Menu compact attached="top" icon={true}>
          <Menu.Menu position="right" style={{ padding: 10 }}>
            <Icon name="close" onClick={onDismiss} />
          </Menu.Menu>
        </Menu>
        <Segment compact attached="bottom" style={{ padding: 0 }}>
          <Term>
            <div className="afterglow-ansi-theme">
              {body}
            </div>
          </Term>
        </Segment>
      </div>
    );
  }
);
