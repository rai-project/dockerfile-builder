import React from "react";
import { connect } from "cerebral/react";
import { Table, Icon } from "semantic-ui-react";

import imagesJSON from "../../assets/Dockerfiles-ppc64le.json";

export default connect({}, function Images({}) {
  console.log(imagesJSON);
  const rows = imagesJSON.map(({ id, name, dockerfile, published }) => {
    return (
      <Table.Row key={id}>
        <Table.Cell singleLine textAlign="left">
          {name}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <a href={dockerfile}>
            <Icon name="file text outline" />
          </a>
        </Table.Cell>
        <Table.Cell textAlign="center">{published ? "Yes" : "No"}</Table.Cell>
      </Table.Row>
    );
  });
  return (
    <Table celled padded>
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
  );
});
