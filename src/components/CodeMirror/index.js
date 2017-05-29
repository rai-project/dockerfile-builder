// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style!css!./../../../node_modules/codemirror/lib/codemirror.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style!css!./codemirror.css";

import React from "react";
import { grpc, BrowserHeaders } from "grpc-web-client";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import classnames from "classnames";
import CodeMirror from "codemirror";
import "whatwg-fetch";
import uuid from "uuid";

import Button from "../Button";
import "./styles.css";

// Import code-generated data structures.
import {
  DockerService
} from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb_service";
import {
  DockerBuildRequest,
  DockerBuildResponse,
  ErrorStatus
} from "../../../proto/build/ts/_proto/raiprojectcom/docker/build_service_pb";

import "codemirror/mode/dockerfile/dockerfile.js";

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
  {
    buttonClicked: signal`app.codeEditorButtonClicked`
  },
  class CodeEditor extends React.Component {
    constructor(props) {
      super(props);
      this.codemirror = null;
      this.onButtonClick = this.onButtonClick.bind(this);
    }
    onButtonClick() {
      if (this.codemirror === null) {
        return;
      }
      const buildDockerRequest = new DockerBuildRequest();
      buildDockerRequest.setId(uuid.v4());
      buildDockerRequest.setContent(this.codemirror.getValue());
      grpc.invoke(DockerService.Build, {
        request: buildDockerRequest,
        host: "/api",
        onMessage: message => {
          console.log("got message: ", message.toObject());
        },
        onEnd: (code, msg, trailers) => {
          if (code == grpc.Code.OK) {
            console.log("all ok");
          } else {
            console.log("hit an error", code, msg, trailers);
          }
        }
      });
    }
    componentWillUnmount() {
      this.codemirror = null;
    }
    componentDidMount() {
      this.codeElement.style.opacity = "1";
      this.codemirror = CodeMirror(this.codeElement, {
        value: content,
        mode: "dockerfile",
        autofocus: true,
        theme: "rai",
        matchTags: {
          bothTags: true
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
          }
        }
      });
      //   this.codemirror.on('change', this.onCodeChange)
      //   this.codemirror.on('cursorActivity', this.onCursorChange)
    }
    render() {
      const onButtonClick = this.onButtonClick;
      return (
        <div className="wrapper">
          <div
            ref={node => {
              this.codeElement = node;
            }}
            className="editor"
          />

          <div className="button">
            <Button
              label="Build"
              onClick={onButtonClick}
              href="#"
              plain={false}
              accent={false}
              type="submit"
            />
          </div> {" "}{" "}{" "}
        </div>
      );
    }
  }
);
