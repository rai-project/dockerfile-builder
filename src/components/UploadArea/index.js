import React, { Component } from "react";
import { Core, DragDrop, Tus10, Dashboard } from "uppy";

import "uppy/dist/uppy.min.css";

export default class UploadArea extends Component {
  componentWillUnmount() {
    this.uppy = null;
  }
  onUploadSuccess(files) {
    console.log("onSuccess not registered");
  }
  componentDidMount() {
    this.uppy = new Core({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 600000,
        maxNumberOfFiles: 5,
        minNumberOfFiles: 1,
        allowedFileTypes: ["application/zip"]
      }
    });
    this.uppy
      .use(DragDrop, { target: this.uppyElement })
      .use(Dashboard, {
        target: this.uppyElement,
        replaceTargetContent: true,
        maxHeight: 300,
        inline: true
      })
      .use(Tus10, {
        endpoint: "/api/upload/",
        resume: true
      })
      .run();

    const onUploadSuccess = this.props.onUploadSuccess || this.onUploadSuccess;
    this.uppy.on("core:success", fileList => {
      console.log(this.uppy.state);
      onUploadSuccess(this.uppy.state.files);
      console.log({ fileList });
    });
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
