import React, { Component } from "react";
import { isNil } from "lodash";
import { Core, DragDrop, Dashboard } from "uppy";
import { binaryStringToBlob, blobToDataURL } from "blob-util";

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
          const data = currentFile.data;
          var reader = new FileReader();
          reader.onloadend = () => {
            binaryStringToBlob(reader.result, "application/zip")
              .then(blobToDataURL)
              .then(function(url) {
                const file = {
                  name: currentFile.name,
                  source: currentFile.source,
                  url: url
                };
                onFileUpload({
                  file
                });
              });
          };
          reader.readAsDataURL(data);
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
