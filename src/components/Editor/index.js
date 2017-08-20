import React from "react";
import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import { isNil, isEmpty } from "lodash";

import CodeMirror from "./CodeMirror";

export default connect(
  {
    files: state`app.zipFile.content`,
    currentFile: state`app.zipFile.entry`
  },
  function Editor({ files, currentFile }) {
    if (isNil(files) || isEmpty(files)) {
      return <div />;
    }
    return <CodeMirror files={files} currentFile={currentFile} />;
  }
);
