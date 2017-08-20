import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";

import Editor from "../Editor";
import Terminal from "../Terminal";
// eslint-disable-next-line
import UploadArea from "../UploadArea";

export default connect(
  {
    zipFile: state`app.zipFile.data`,
    appLoaded: signal`app.appLoaded`
  },
  class Home extends React.Component {
    componentDidMount() {
      this.props.appLoaded({ input: this.props.zipFile });
    }
    render() {
      return (
        <div>
          {/* <UploadArea />
        <Editor files={files} withMenuBar={true} currentFile={"test_folder/Dockerfile"} />
      */}
          <Editor />
          <Terminal />
        </div>
      );
    }
  }
);
