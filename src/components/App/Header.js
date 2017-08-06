import React from "react";
import { Header as UIHeader, Container } from "semantic-ui-react";

export default function Header({ appName, currentPage }) {
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
