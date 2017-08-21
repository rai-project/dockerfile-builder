import appLoaded from "./signals/appLoaded";
import buildButtonClicked from "./signals/buildButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";
import codeEditorFileChanged from "./signals/codeEditorFileChanged";
import codeEditorFilesChanged from "./signals/codeEditorFilesChanged";
import fileUploaded from "./signals/fileUploaded";

// eslint-disable-next-line import/no-webpack-loader-syntax
import zipFileContent from "!base64-loader!../../_fixtures/test1.zip";

import base64ToBlob from "../../common/base64ToBlob";

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

export default {
  state: {
    name: "app.Name", //"Dockerfile Builder for Power",
    state: {
      loading: true,
      saving: false,
      building: false
    },
    upload: {
      visible: true,
      files: []
    },
    terminal: {
      visible: false,
      output: []
    },
    files: {
      entry: "Dockerfile",
      content: null,
      prefix: "",
      zip: blobToFile(base64ToBlob(zipFileContent), "upload.zip")
    },
    editor: {
      currentFile: null,
      mode: "docker"
    }
  },
  signals: {
    appLoaded,
    fileUploaded,
    buildButtonClicked,
    terminalOutputAppended,
    codeEditorFileChanged,
    codeEditorFilesChanged
  }
};
