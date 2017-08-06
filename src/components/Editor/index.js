import React from "react";
import PropTypes from "prop-types";

import CodeMirror from "./CodeMirror";

export default class Editor extends React.Component {
  static propTypes = {
    files: PropTypes.object
  };

  static defaultProps = {
    files: {}
  };
  render() {
    return <CodeMirror {...this.props} />;
  }
}
