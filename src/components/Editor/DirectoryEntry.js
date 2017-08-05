import React from "react";
import PropTypes from "prop-types";
import { Row } from "hedron";
import styled from "styled-components";
import yeast from "yeast";
import FileIcon from "react-icons/lib/fa/file-code-o";

const Node = styled.div`
  margin-left: 6px;
  border-left: 1px dashed #d6d6d6;
  padding-left: 6px;
  :hover {
    background-color: #ddd;
  }
`;

const Name = styled.span`padding-left: 5px;`;

export default class File extends React.Component {
  static propTypes = {
    debug: PropTypes.bool,
    uuid: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
  };

  static defaultProps = {
    debug: false,
    uuid: yeast()
  };
  render() {
    const { debug, name } = this.props;
    return (
      <Row debug={debug}>
        <Node>
          <FileIcon />
          <Name>
            {name}
          </Name>
        </Node>
      </Row>
    );
  }
}
