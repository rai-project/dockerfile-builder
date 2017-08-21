import React, { Component } from "react";
import { map, isNil } from "lodash";
import { Core, DragDrop, Dashboard } from "uppy";

import "uppy/dist/uppy.min.css";

export default class UploadArea extends Component {
  componentWillUnmount() {
    this.uppy = null;
  }
  onUploadSuccess(files) {
    console.log("onSuccess not registered");
  }
  componentDidMount() {
    const { onFileUpload } = this.props;

    this.uppy = new Core({
      debug: false,
      autoProceed: false,
      restrictions: {
        maxFileSize: 600000,
        maxNumberOfFiles: 5,
        minNumberOfFiles: 1,
        allowedFileTypes: ["application/zip"]
      },
      onBeforeFileAdded: (currentFile, files) => {
        if (!isNil(onFileUpload)) {
          console.log({ currentFile: currentFile.data });
          onFileUpload({ files: [currentFile.data] });
        }
        return Promise.resolve();
      }
    });
    this.uppy
      .use(DragDrop, { target: this.uppyElement })
      .use(Dashboard, {
        target: this.uppyElement,
        replaceTargetContent: true,
        maxHeight: 300,
        inline: true,
        hideUploadButton: true,
        showProgressDetails: false
      })
      .run();
  }

  render() {
    return (
      <div style={{ color: "black", minWidth: 0 }}>
        <div
          ref={node => {
            this.uppyElement = node;
          }}
        />
      </div>
    );
  }
}
