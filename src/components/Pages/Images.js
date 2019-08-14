import React from "react";
import { head, split, flatten } from "lodash";
import { Table, Icon } from "semantic-ui-react";
import Markdown from "../Markdown";

import imagesJSON from "../../assets/Dockerfiles-ppc64le.json";

const REPO_PREFIX =
  "https://github.com/rai-project/Dockerfiles-ppc64le/blob/master/";
const RAW_REPO_PREFIX =
  "https://raw.githubusercontent.com/rai-project/Dockerfiles-ppc64le/master/";

export default class Images extends React.Component {
  state = { activeId: 0 };

  handleClick = id => {
    this.setState({ activeId: id });
  };

  render() {
    const { activeId } = this.state;
    const urlOf = name => "https://hub.docker.com/r/" + head(split(name, ":"));
    const rows = imagesJSON.map(
      ({ id, name, dockerfile, readme, published }) => {
        const negative = !published;
        const readmeRawURL = readme.replace(REPO_PREFIX, RAW_REPO_PREFIX);
        const iconName = activeId === id ? "dropdown" : "triangle right";
        return [
          <Table.Row key={id} active={activeId === id}>
            <Table.Cell singleLine textAlign="left">
              <Icon name={iconName} onClick={() => this.handleClick(id)} />
              <a href={urlOf(name)}>{name}</a>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <a href={dockerfile}>
                <Icon name="file text outline" />
              </a>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <a href={readmeRawURL}>
                <Icon name="file text outline" />
              </a>
            </Table.Cell>
            <Table.Cell singleLine textAlign="left">
              {architecture}
            </Table.Cell>
          </Table.Row>,
          activeId === id ? (
            <Table.Row key={id + "README"}>
              <Table.Cell colSpan="4">
                <Markdown url={readmeRawURL} />
              </Table.Cell>
            </Table.Row>
          ) : null
        ];
      }
    );
    return (
`````<Table celled striped selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine textAlign="center">
              Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Dockerfile</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Readme</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Architecture</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{flatten(rows)}</Table.Body>
      </Table>`
    );
  }
}
