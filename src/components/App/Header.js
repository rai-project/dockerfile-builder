import React from "react";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";

import { Header as UIHeader, Container } from "semantic-ui-react";

export default connect(
  {
    currentPage: state`app.currentPage`,
    appName: state`app.name`
  },
  function Header({ appName, currentPage }) {
    const showTagLine = currentPage === "Home";
    return (
      <div className="App-header">
        <Container textAlign={"center"}>
          <UIHeader size="huge">
            {appName}
          </UIHeader>
          {showTagLine
            ? <UIHeader size="small">Docker for Power</UIHeader>
            : null}
        </Container>
      </div>
    );
  }
);
