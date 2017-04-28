import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import classnames from "classnames";
import MonacoEditor from "react-monaco-editor";

import styles from "./styles.css";

const requireSourceURL = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.js";
const monacoSourceURL = "https://unpkg.com/monaco-editor@0.8.3/min/vs";

const dockerfile = String.raw`FROM rai/nccl:8.0
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
    render() {
      const requireConfig = {
        url: requireSourceURL,
        paths: {
          vs: monacoSourceURL,
        },
      };
      return (
        <MonacoEditor
          width="100%"
          height="600"
          language="dockerfile"
          value={dockerfile}
          requireConfig={requireConfig}
          theme="vs-dark"
        />
      );
    }
  }
);
