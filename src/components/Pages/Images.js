import React from "react";
import { flatten, isNil } from "lodash";
import { Table, Icon } from "semantic-ui-react";

import imagesJSON from "../../assets/Dockerfiles-ppc64le.json";

export default class Images extends React.Component {

  render() {
    //const urlOf = name => "https://hub.docker.com/r/" + head(split(name, ":"));
    const rows = imagesJSON.map(({ id, count, name, dockerfile, readme, architecture }) => {
      if (isNil(id)) {
        id = name;
      }
      return [
        <Table.Row key={id}>
          <Table.Cell singleLine textAlign="right">
            {count}
          </Table.Cell>
          <Table.Cell singleLine textAlign="left">
            {name}
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
    });
    return (
      <Table celled striped selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine textAlign="right">ID</Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign="left">Image Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Dockerfile</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Readme</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Architecture</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{flatten(rows)}</Table.Body>
      </Table>
    );
  }
}
