import React from "react";
import { Header, Icon, Image } from "semantic-ui-react";

import c3srImage from "../../assets/images/C3SR_color.jpg";
import uiucImage from "../../assets/images/uiuc_logo_small.png";

export default function Footer() {
  return (
    <footer>
      <a href="https://github.com/rai-project/dockerfile-builder">
        <Image src={c3srImage} size="small" floated="right" />
        <Image src={uiucImage} size="small" floated="right" />
        <Header inverted as="h3">
          <Icon name="github" />
          <Header.Content>rai-project/dockerfile-builder</Header.Content>
        </Header>
      </a>
    </footer>
  );
}
