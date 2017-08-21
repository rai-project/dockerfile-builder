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
    codeEditorFileChanged: signal`app.codeEditorFileChanged`
  },
  function Editor({ files, entry, mode, currentFile, codeEditorFileChanged }) {
    if (isNil(files) || isEmpty(files)) {
      return <div />;
    }
    return (
      <CodeMirror
        mode={mode}
        readOnly={true}
        files={files}
        currentFile={currentFile || entry}
        withMenuBar={true}
        onFileSelectClick={codeEditorFileChanged}
      />
    );
  }
);
