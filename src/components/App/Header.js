import React from "react";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";

import { Header as UIHeader, Container } from "semantic-ui-react";

export default connect(
  {
    appName: state`app.name`,
    currentPage: state`app.currentPage`
  },
  function Header({ appName, currentPage }) {
    const showTagLine = currentPage === "Home";
    return (
      <div className="App-header">
        <Container textAlign={"center"}>
          <UIHeader inverted size="large">
            {appName}
          </UIHeader>
          {showTagLine
            ? <UIHeader inverted size="small">
                Docker for Power
              </UIHeader>
            : null}
        </Container>
      </div>
    );
  }
);
