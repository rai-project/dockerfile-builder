import appLoaded from "./signals/appLoaded";
import navbarClicked from "./signals/navbarClicked";
import codeEditorButtonClicked from "./signals/codeEditorButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";
import codeEditorFileChanged from "./signals/codeEditorFileChanged";

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
    name: "Dockerfile Builder for Power",
    isLoaded: false,
    isSaving: false,
    isBuilding: false,
    terminalOutput: [],
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
    navbarClicked,
    codeEditorButtonClicked,
    terminalOutputAppended,
    codeEditorFileChanged
  }
};
