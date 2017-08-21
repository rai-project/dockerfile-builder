import React from "react";
import { Header as UIHeader } from "semantic-ui-react";

export default function Header({ appName, currentPage }) {
  return (
    <div className="App-header">
      <UIHeader inverted textAlign={"center"} size="large">
        {appName}
      </UIHeader>
    </div>
  );
}
