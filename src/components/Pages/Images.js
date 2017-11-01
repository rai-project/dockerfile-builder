import React from "react";
import { head, split, trimStart } from "lodash";
import { Accordion, Table, Icon } from "semantic-ui-react";
import Markdown from "../Markdown";

import imagesJSON from "../../assets/Dockerfiles-ppc64le.json";

const REPO_PREFIX =
  "https://github.com/rai-project/Dockerfiles-ppc64le/blob/master/";
const RAW_REPO_PREFIX =
  "https://raw.githubusercontent.com/rai-project/Dockerfiles-ppc64le/master/";

export default class Images extends React.Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const urlOf = name => "https://hub.docker.com/r/" + head(split(name, ":"));
    const rows = imagesJSON.map(
      ({ id, name, dockerfile, readme, published }) => {
        const negative = !published;
        const readmeRawURL = RAW_REPO_PREFIX + trimStart(readme, REPO_PREFIX);
        return (
          <Table.Row
            key={id}
            negative={negative}
            active={activeIndex === id}
            fluid
          >
            <Accordion.Title
              active={activeIndex === id}
              key={id}
              index={id}
              onClick={this.handleClick}
              style={{ display: "table-row" }}
            >
              <Table.Cell singleLine textAlign="left">
                <Icon name="dropdown" />
                <a href={urlOf(name)}>{name}</a>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <a href={dockerfile}>
                  <Icon name="file text outline" />
                </a>
              </Table.Cell>
              <Table.Cell textAlign="center">
                {published ? "Yes" : "No"}
              </Table.Cell>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === id}>
              <p>{readme}</p>
            </Accordion.Content>
          </Table.Row>
        );
      }
    );
    return (
      <Accordion fluid>
        <Table celled striped selectable padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine textAlign="center">
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Dockerfile</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Published</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </Accordion>
    );
  }
}
