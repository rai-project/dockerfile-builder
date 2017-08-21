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
    uploadVisible: state`app.upload.visible`,
    terminalVisible: state`app.terminal.visible`,
    building: state`app.state.building`,
    appLoaded: signal`app.appLoaded`,
    onFileUpload: signal`app.fileUploaded`
  },
  function Home({ uploadVisible, terminalVisible, fileUploaded }) {
    return (
      <div>
        <If condition={uploadVisible}>
          <Then>
            <UploadArea onFileUpload={onFileUpload} />
          </Then>
          <Else>
            {() =>
              <If condition={!terminalVisible}>
                <Then>
                  <Editor />
                </Then>
                <Else>
                  {() => <Terminal />}
                </Else>
              </If>}
          </Else>
        </If>
      </div>
    );
  }
);
