import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";

import { Container, Menu } from "semantic-ui-react";

export default connect(
  {
    currentPage: state`app.currentPage`,
    navbarClicked: signal`app.navbarClicked`
  },
  function NavBar({ navbarClicked, currentPage }) {
    return (
      <div className="App-menu">
        <Container>
          <Menu pointing secondary>
            <Menu.Menu position="right">
              <Menu.Item
                name="about"
                active={currentPage === "About"}
                onClick={e => navbarClicked({ name: "About" })}
              />
            </Menu.Menu>
          </Menu>
        </Container>
      </div>
    );
  }
);