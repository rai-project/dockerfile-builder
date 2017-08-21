// @flow

import { Dropdown, Icon, Menu, Segment, Popup } from "semantic-ui-react";
import { If, Then } from "react-if";

import React from "react";
import idx from "idx";
import classNames from "classnames";
// import PropTypes from "prop-types";
import ICodeMirror from "codemirror";
import { endsWith, isUndefined, size, keys, head } from "lodash";

import "codemirror/addon/dialog/dialog";
import "codemirror/addon/hint/show-hint";

// eslint-disable-next-line import/no-webpack-loader-syntax
import "codemirror/lib/codemirror.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "./theme.css";

type File = {
  content: string,
  uuid: string,
  createdOn: Date,
  updatedOn: Date
};

type Props = {
  mode: string,
  withMenuBar: boolean,
  currentFile: string,
  files: { [string]: File },
  fontSize: number,
  readOnly: boolean,
  onNewIconClick: (Event => void) | void,
  onSaveIconClick: ((Event, string | null | void) => void) | void,
  onFileSelectClick: (Object => void) | void,
  onPublishClick: (Object => void) | void,
  onBuildClick: (Object => void) | void
};

export default class CodeMirror extends React.Component<Props, Props, void> {
  codeElement: HTMLDivElement;
  editor: ICodeMirror.Editor;
  static defaultProps: Props = {
    mode: "docker",
    currentFile: "",
    withMenuBar: false,
    files: {},
    fontSize: 14,
    readOnly: false,
    onNewIconClick: undefined,
    onSaveIconClick: undefined,
    onFileSelectClick: undefined,
    onPublishClick: undefined,
    onBuildClick: undefined
  };
  async getMode(mode: string) {
    if (!mode) return "jsx";

    switch (mode) {
      case "cuda":
        await import("./mode/cuda.js");
        return "text/x-cuda-src";
      case "c":
      case "cpp":
        await import("codemirror/mode/clike/clike");
        return mode;
      case "css":
        await import("codemirror/mode/css/css");
        return "css";
      case "html":
        await import("codemirror/mode/htmlmixed/htmlmixed");
        return "htmlmixed";
      case "docker":
      case "dockerfile":
        await import("codemirror/mode/dockerfile/dockerfile");
        return "dockerfile";
      default:
        return "jsx";
    }
  }

  async getDetectMode(fileName: string) {
    if (fileName === "Dockerfile") {
      return this.getMode("dockerfile");
    }
    if (endsWith(fileName, ".cu") || endsWith(fileName, ".cuh")) {
      return this.getMode("cuda");
    }
    if (
      endsWith(fileName, ".c") ||
      endsWith(fileName, ".h") ||
      endsWith(fileName, ".cpp") ||
      endsWith(fileName, ".cxx") ||
      endsWith(fileName, ".cc") ||
      endsWith(fileName, ".hpp") ||
      endsWith(fileName, ".hxx")
    ) {
      return this.getMode("cpp");
    }
  }

  onChange = () => {
    // console.log(arguments);
  };
  componentDidMount() {
    // eslint-disable-next-line new-cap
    this.editor = ICodeMirror(this.codeElement, {
      value: "",
      mode: "",
      autofocus: true,
      theme: "rai",
      matchTags: {
        bothTags: true
      },
      autoCloseTags: true,
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
    this.editor.on("change", this.onChange);
    //   this.codemirror.on('change', this.onCodeChange)
    //   this.codemirror.on('cursorActivity', this.onCursorChange)
    this.update();
  }
  async update() {
    const currentFile =
      size(this.props.files) === 1 && this.props.currentFile === ""
        ? head(keys(this.props.files))
        : this.props.currentFile;
    const value = idx(this.props, _ => _.files[currentFile].content) || "";
    this.editor.setValue(value);

    const mode = await this.getDetectMode(currentFile);
    this.editor.setOption("mode", mode);

    this.editor.refresh();
  }
  componentDidUpdate() {
    this.update();
  }
  handleSaveIconClick = (e: Event) => {
    const content = idx(this.editor, _ => _.value);
    if (this.props.onSaveIconClick) {
      this.props.onSaveIconClick(e, content);
    }
  };
  handleNewIconClick = (e: Event) => {
    if (this.props.onNewIconClick) {
      this.props.onNewIconClick(e);
    }
  };
  handleFileSelectClick = (e: Event, data: Object) => {
    if (this.props.onFileSelectClick) {
      this.props.onFileSelectClick({ file: data.text });
    }
  };
  handleBuildIconClick = (e: Event, data: Object) => {
    if (this.props.onBuildClick) {
      this.props.onBuildClick({ data });
    }
  };
  handlePublishIconClick = (e: Event, data: Object) => {
    if (this.props.onPublishClick) {
      this.props.onPublishClick({ data });
    }
  };
  render() {
    // const { fontSize } = this.props;
    const mainElement = (
      <div
        ref={ref => (this.codeElement = ref)}
        className={classNames("editor")}
      />
    );
    if (this.props.withMenuBar === false) {
      return mainElement;
    }
    if (
      isUndefined(this.props.onNewIconClick) &&
      isUndefined(this.props.onSaveIconClick) &&
      size(this.props.files) <= 1
    ) {
      return mainElement;
    }

    return (
      <div>
        <Menu attached="top" icon={true}>
          <If condition={!isUndefined(this.props.onNewIconClick)}>
            <Then>
              <Menu.Item name="new" onClick={this.handleNewIconClick}>
                <Icon name="file text outline" />
              </Menu.Item>
            </Then>
          </If>
          <If condition={!isUndefined(this.props.onSaveIconClick)}>
            <Then>
              <Menu.Item name="save" onClick={this.handleSaveIconClick}>
                <Icon name="save" />
              </Menu.Item>
            </Then>
          </If>
          <If condition={size(this.props.files) > 1}>
            <Then>
              <Menu.Menu position="left">
                <Dropdown item simple text="Files">
                  <Dropdown.Menu>
                    {keys(this.props.files).map((name: string) => {
                      return (
                        <Dropdown.Item
                          text={name}
                          icon="file text outline"
                          key={this.props.files[name].uuid}
                          onClick={this.handleFileSelectClick}
                        />
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Then>
          </If>
          <Menu.Menu position="right">
            <Menu.Item name="build" onClick={this.handleBuildIconClick}>
              <Popup trigger={<Icon name="setting" />} content="Build image" />
            </Menu.Item>
            <Menu.Item name="publish" onClick={this.handlePublishIconClick}>
              <Popup
                trigger={<Icon name="cloud upload" />}
                content="Publish image to DockerHub"
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom" style={{ paddingTop: 0 }}>
          {mainElement}
        </Segment>
      </div>
    );
  }
}
