import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";

import { If, Then, Else } from "react-if";

import Editor from "../Editor";
import Terminal from "../Terminal";
// eslint-disable-next-line
import UploadArea from "../UploadArea";

export default connect(
  {
    zip: state`app.files.zip`,
    terminalVisible: state`app.terminal.visible`,
    isBuilding: state`app.isBuilding`,
    appLoaded: signal`app.appLoaded`
  },
  class Home extends React.Component {
    componentDidMount() {
      this.props.appLoaded({ input: this.props.zip });
    }
    render() {
      const { terminalVisible } = this.props;
      return (
        <div>
          {/* <UploadArea />*/}
          <If condition={!terminalVisible}>
            <Then>
              <Editor />
            </Then>
            <Else>
              <Terminal />
            </Else>
          </If>
        </div>
      );
    }
  }
);
