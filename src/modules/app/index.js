import appLoaded from "./signals/appLoaded";
import buildButtonClicked from "./signals/buildButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";
import codeEditorFileChanged from "./signals/codeEditorFileChanged";
import codeEditorFilesChanged from "./signals/codeEditorFilesChanged";
import fileUploaded from "./signals/fileUploaded";

export default {
  state: {
    name: process.env.APP_NAME || "Docker for Power",
    state: {
      loading: true,
      saving: false,
      building: false,
      uploading: false
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
      prefix: ""
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
