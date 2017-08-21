import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import { isNil, isEmpty } from "lodash";

import CodeMirror from "./CodeMirror";

export default connect(
  {
    files: state`app.files.content`,
    entry: state`app.files.entry`,
    model: state`app.editor.mode`,
    currentFile: state`app.editor.currentFile`,
    codeEditorButtonClicked: signal`app.codeEditorButtonClicked`,
    codeEditorFileChanged: signal`app.codeEditorFileChanged`,
    codeEditorFilesChanged: signal`app.codeEditorFilesChanged`
  },
  function Editor({
    files,
    entry,
    mode,
    currentFile,
    codeEditorButtonClicked,
    codeEditorFileChanged,
    codeEditorFilesChanged
  }) {
    if (isNil(files) || isEmpty(files)) {
      return <div />;
    }
    return (
      <CodeMirror
        mode={mode}
        files={files}
        currentFile={currentFile || entry}
        withMenuBar={true}
        onBuildClick={codeEditorButtonClicked}
        onFileSelectClick={codeEditorFileChanged}
        onFilesChanged={codeEditorFilesChanged}
      />
    );
  }
);
