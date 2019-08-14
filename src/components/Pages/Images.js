import React from "react";
import { flatten } from "lodash";
import { Table, Icon } from "semantic-ui-react";

import imagesJSON from "../../assets/Dockerfiles-ppc64le.json";

export default class Images extends React.Component {
  state = { activeId: 0 };

  handleClick = id => {
    this.setState({ activeId: id });
  };

  render() {
    const { activeId } = this.state;
    const rows = imagesJSON.map(
      ({ _id, name, dockerfile, readme, architecture }) => {
        return [
          <Table.Row key={id} active={activeId === _id}>
            <Table.Cell textAlign="right">
              {_id}
            </Table.Cell>
            <Table.Cell singleLine textAlign="left">
              (name)
            </Table.Cell>
            <Table.Cell textAlign="center">
              <a href={dockerfile}>
                <Icon name="file text outline" />
              </a>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <a href={readme}>
                <Icon name="file text outline" />
              </a>
            </Table.Cell>
            <Table.Cell singleLine textAlign="left">
              {architecture}
            </Table.Cell>
          </Table.Row>
        ];
      }
    );
    return (
      <Table celled striped selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="right">ID</Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign="center">
              Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Dockerfile</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Readme</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Architecture</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{flatten(rows)}</Table.Body>
      </Table>
    );
  }
}
