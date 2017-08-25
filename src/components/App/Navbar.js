import React from "react";
import { connect } from "cerebral/react";
import { signal } from "cerebral/tags";

import { Container, Menu } from "semantic-ui-react";

export default connect(
  {
    navbarClicked: signal`app.navbarClicked`
  },
  function NavBar({ navbarClicked, currentPage }) {
    return (
      <Container>
        <Menu pointing inverted secondary>
          <Menu.Menu position="right">
            <Menu.Item
              name="images"
              active={currentPage === "Images"}
              onClick={e => navbarClicked({ name: "Images" })}
            />
            <Menu.Item
              name="about"
              active={currentPage === "About"}
              onClick={e => navbarClicked({ name: "About" })}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
);
