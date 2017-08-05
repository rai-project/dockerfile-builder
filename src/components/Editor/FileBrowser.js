import React from "react";
import PropTypes from "prop-types";
import { Page } from "hedron";
import Directory from "./Directory";
import yeast from "yeast";
import { DragDropContext } from "react-dnd";

class FileBrowser extends React.Component {
  static propTypes = {
    content: PropTypes.array,
    debug: PropTypes.bool
  };
  static defaultProps = {
    content: [],
    debug: false
  };
  render() {
    const { content, debug } = this.props;
    return (
      <Page fluid debug={debug}>
        <Directory
          debug={debug}
          isOpen={true}
          name={"/"}
          uuid={yeast()}
          content={content}
        />
      </Page>
    );
  }
}

// eslint-disable-next-line
export default FileBrowser;
