import React from "react";

// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style!css!./../../../node_modules/codemirror/lib/codemirror.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style!css!./codemirror.css";

import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import classnames from "classnames";
import CodeMirror from "codemirror";

import styles from "./styles.css";

import "codemirror/mode/dockerfile/dockerfile.js";

const requireSourceURL = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.js";
const monacoSourceURL = "https://unpkg.com/monaco-editor@0.8.3/min/vs";

const content = String.raw`FROM rai/nccl:8.0
MAINTAINER Abdul Dakkak <dakkak@illinois.edu>

WORKDIR /usr/local
RUN git clone https://github.com/cuMF/cumf_als && \
    git clone https://github.com/cuMF/cumf_sgd && \
    git clone https://github.com/cuMF/cumf_ccd

WORKDIR /usr/local/cumf_sgd/data/netflix/
RUN curl -fsSL http://www.select.cs.cmu.edu/code/graphlab/datasets/netflix_mme -O
RUN curl -fsSL http://www.select.cs.cmu.edu/code/graphlab/datasets/netflix_mm -O

RUN cd /usr/local/cumf_sgd/data/netflix && \
    make transform && \
    ./transform netflix_mme && \
    ./transform netflix_mm
    `;

export default connect(
  {},
  class CodeEditor extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.codeElement.style.opacity = "1";
      this.codemirror = CodeMirror(this.codeElement, {
        value: content,
        mode: "dockerfile",
        autofocus: true,
        theme: "wgx",
        matchTags: {
          bothTags: true,
        },
        autoCloseTags: true,
        gutters: ["CodeMirror-lint-markers"],
        lint: false,
        lineNumbers: true,
        readOnly: this.props.readOnly ? "nocursor" : false,
        indentUnit: 2,
        extraKeys: {
          Tab(cm) {
            const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");

            cm.replaceSelection(spaces);
          },
        },
      });
      //   this.codemirror.on('change', this.onCodeChange)
      //   this.codemirror.on('cursorActivity', this.onCursorChange)
    }
    render() {
      return (
        <div className={styles.wrapper}>
          <div
            ref={node => {
              this.codeElement = node;
            }}
            className={styles.codeWrapper}
          />{" "}
        </div>
      );
    }
  }
);
