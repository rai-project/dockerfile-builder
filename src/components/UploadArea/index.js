import React, { Component } from "react";
import { isNil } from "lodash";
import { Container } from "semantic-ui-react";
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
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ["Dockerfile", "application/zip", "text/*"]
      },
      onBeforeFileAdded: (currentFile, files) => {
        if (isNil(onFileUpload)) {
          return Promise.resolve();
        }
        const type =
          currentFile.name === "Dockerfile" ? "text/plain" : "application/zip";
        let reader = new FileReader();
        reader.onloadend = () =>
          binaryStringToBlob(reader.result, type)
            .then(blobToDataURL)
            .then(url =>
              onFileUpload({
                file: {
                  name: currentFile.name,
                  source: currentFile.source,
                  url: url
                }
              })
            );
        reader.readAsDataURL(currentFile.data);
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
        showProgressDetails: false,
        locale: {
          strings: {
            dropPasteImport: "Drop Dockerfile or zip file here, paste, or",
            dropPaste: "Drop Dockerfile or zip file here, paste, or"
          }
        }
      })
      .run();
  }

  render() {
    return (
      <Container text textAlign="center">
        <div
          ref={node => {
            this.uppyElement = node;
          }}
        />
      </Container>
    );
  }
}
