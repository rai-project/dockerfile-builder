// @flow

import {
  Dropdown,
  Icon,
  Menu,
  Segment,
  Popup,
  Modal,
  Button,
  Form
} from "semantic-ui-react";
import { If, Then } from "react-if";

import React from "react";
import idx from "idx";
import classNames from "classnames";
// import PropTypes from "prop-types";
import ICodeMirror from "codemirror";
import {
  endsWith,
  isUndefined,
  size,
  keys,
  head,
  isNil,
  toLower
} from "lodash";
import FileType from "../../thirdparty/filetype";

import "codemirror/addon/dialog/dialog";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/search/search";

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
  onFilesChanged: ({ [string]: File }) => void | void,
  onNewIconClick: (Event => void) | void,
  onSaveIconClick: ((Event, string | null | void) => void) | void,
  onFileSelectClick: (Object => void) | void,
  onPushClick: (() => void) | void,
  onBuildClick: (() => void) | void
};

type State = {
  files: { [string]: File },
  currentFile: string,
  pushModalOpen: boolean,
  pushOptions: {
    username: string,
    password: string,
    imageName: string
  }
};

export default class CodeMirror extends React.Component<Props, State> {
  codeElement: HTMLDivElement;
  editor: ICodeMirror.Editor;
  static defaultProps: Props = {
    mode: "docker",
    currentFile: "",
    withMenuBar: false,
    files: {},
    fontSize: 14,
    readOnly: false,
    onFilesChanged: undefined,
    onNewIconClick: undefined,
    onSaveIconClick: undefined,
    onFileSelectClick: undefined,
    onPushClick: undefined,
    onBuildClick: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files,
      currentFile: this.props.currentFile,
      pushModalOpen: false,
      pushOptions: {
        username: "",
        password: "",
        imageName: ""
      }
    };
  }
  async getMode(mode: string) {
    if (!mode) return "jsx";

    mode = toLower(mode);
    switch (mode) {
      case "js":
      case "jsx":
      case "javascript":
      case "json":
        await import("codemirror/addon/hint/javascript-hint");
        await import("codemirror/mode/javascript/javascript");
        return "text/javascript";
      case "cuda":
        await import("./mode/cuda.js");
        return "text/x-cuda-src";
      case "go":
        await import("codemirror/mode/go/go");
        return "text/x-go";
      case "c":
      case "cpp":
        await import("codemirror/mode/clike/clike");
        return "text/x-c++src";
      case "python":
        await import("codemirror/mode/python/python");
        return "text/x-python";
      case "css":
        await import("codemirror/addon/hint/css-hint");
        await import("codemirror/mode/css/css");
        return "text/css";
      case "html":
        await import("codemirror/addon/hint/xml-hint");
        await import("codemirror/addon/hint/html-hint");
        await import("codemirror/mode/htmlmixed/htmlmixed");
        return "text/html";
      case "docker":
      case "dockerfile":
        await import("codemirror/mode/dockerfile/dockerfile");
        return "text/x-dockerfile";
      case "cmake":
      case "cmakefile":
      case "make":
      case "makefile":
        await import("codemirror/mode/cmake/cmake");
        return "text/x-cmake";
      case "math":
      case "mathematica":
        await import("codemirror/mode/mathematica/mathematica");
        return "text/x-mathematica";
      case "markdown":
      case "md":
        await import("codemirror/mode/markdown/markdown");
        return "text/x-markdown";
      case "yaml":
      case "yml":
        await import("codemirror/mode/yaml/yaml");
        return "text/x-yaml";
      case "shell":
      case "base":
      case "zsh":
        await import("codemirror/mode/shell/shell");
        return "text/x-sh";
      default:
        return "jsx";
    }
  }

  async getDetectMode(fileName: string) {
    fileName = toLower(fileName);
    if (fileName === "dockerfile") {
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
    if (endsWith(fileName, ".py")) {
      return this.getMode("python");
    }
    if (endsWith(fileName, ".sh")) {
      return this.getMode("shell");
    }
    if (endsWith(fileName, ".js") || endsWith(fileName, ".jsx")) {
      return this.getMode("javascript");
    }
    if (endsWith(fileName, ".yml") || endsWith(fileName, ".yaml")) {
      return this.getMode("yaml");
    }
    if (endsWith(fileName, ".m") || endsWith(fileName, ".wl")) {
      return this.getMode("mathematica");
    }
    if (fileName === "cmakefile.txt") {
      return this.getMode("cmake");
    }
    if (fileName === "makefile") {
      return this.getMode("make");
    }
    if (endsWith(fileName, ".html")) {
      return this.getMode("html");
    }
    if (endsWith(fileName, ".css")) {
      return this.getMode("css");
    }
    if (endsWith(fileName, ".go")) {
      return this.getMode("go");
    }
    if (endsWith(fileName, ".md")) {
      return this.getMode("md");
    }
  }

  onChange = () => {
    let { files, currentFile } = this.state;
    const value = this.editor.getValue();
    files = {
      ...files,
      [currentFile]: {
        ...files[currentFile],
        updatedOn: new Date(),
        content: value
      }
    };
    this.setState({ files });
    if (this.props.onFilesChanged) {
      this.props.onFilesChanged({ files });
    }
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
    //   this.codemirror.on('change', this.onCodeChange)
    //   this.codemirror.on('cursorActivity', this.onCursorChange)
    this.update();
    this.editor.on("change", this.onChange);
  }

  async update() {
    let { files, currentFile } = this.state;
    currentFile =
      size(files) === 1 && currentFile === "" ? head(keys(files)) : currentFile;
    const value = idx(this.state, _ => _.files[currentFile].content) || "";
    this.editor.setValue(value);

    const mode = await this.getDetectMode(currentFile);
    this.editor.setOption("mode", mode);

    this.editor.refresh();
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
    this.setState({
      currentFile: data.text
    });
    this.forceUpdate(this.update);
    if (this.props.onFileSelectClick) {
      this.props.onFileSelectClick({ file: data.text });
    }
  };
  handleBuildIconClick = (e: Event, data: Object) => {
    if (this.props.onBuildClick) {
      this.props.onBuildClick();
    }
  };
  handlePushIconClick = (e: Event, data: Object) => {
    this.setState({
      pushModalOpen: true
    });
  };
  handlePushModalClose = () => {
    this.setState({
      pushModalOpen: false
    });
  };
  handlePushClick = (e: Event, data: Object) => {
    this.handlePushModalClose();
    if (this.props.onPushClick) {
      this.props.onPushClick({ pushOptions: this.state.pushOptions });
    }
  };
  handlePushFormChange = (e: Event, { name, value }) => {
    this.setState({
      pushOptions: {
        ...this.state.pushOptions,
        [name]: value
      }
    });
  };
  render() {
    const { files, onNewIconClick, withMenuBar, onSaveIconClick } = this.props;
    const { pushModalOpen } = this.state;

    const mainElement = (
      <div
        ref={ref => (this.codeElement = ref)}
        className={classNames("editor")}
      />
    );
    if (withMenuBar === false) {
      return mainElement;
    }
    if (
      isNil(onNewIconClick) &&
      isNil(onSaveIconClick) &&
      size(this.state.files) <= 1
    ) {
      return mainElement;
    }

    return (
      <div>
        <Menu attached="top" icon={true}>
          <If condition={!isUndefined(onNewIconClick)}>
            <Then>
              <Menu.Item name="new" onClick={this.handleNewIconClick}>
                <Icon name="file text outline" />
              </Menu.Item>
            </Then>
          </If>
          <If condition={!isNil(onSaveIconClick)}>
            <Then>
              <Menu.Item name="save" onClick={this.handleSaveIconClick}>
                <Icon name="save" />
              </Menu.Item>
            </Then>
          </If>
          <If condition={size(files) > 1}>
            <Then>
              <Menu.Menu position="left">
                <Dropdown item simple text="Files">
                  <Dropdown.Menu>
                    {keys(files).map((name: string) =>
                      <Dropdown.Item
                        disabled={!isNil(FileType(files[name].content))}
                        text={name}
                        icon="file text outline"
                        key={files[name].uuid}
                        onClick={this.handleFileSelectClick}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Then>
          </If>
          <Menu.Menu position="right">
            <Menu.Item name="build" onClick={this.handleBuildIconClick}>
              <Popup trigger={<Icon name="setting" />} content="Build image" />
            </Menu.Item>
            <Menu.Item name="push" onClick={this.handlePushIconClick}>
              <Popup trigger={<Icon name="cloud upload" />}>
                <Popup.Content>Push image to DockerHub</Popup.Content>
              </Popup>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom" style={{ paddingTop: 0 }}>
          {mainElement}
        </Segment>
        <Modal
          open={pushModalOpen}
          dimmer="blurring"
          onClose={this.handlePushModalClose}
        >
          <Modal.Header>Push Docker Image Configuration</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Input
                  label="Image Name"
                  placeholder="c3sr/image:latest"
                  name="imageName"
                  onChange={this.handlePushFormChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    label="Dockerhub Username"
                    placeholder="Dockerhub Username"
                    name="username"
                    onChange={this.handlePushFormChange}
                  />
                  <Form.Input
                    type="password"
                    label="Dockerhub Password"
                    placeholder="Dockerhub Password"
                    name="password"
                    onChange={this.handlePushFormChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handlePushModalClose}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Push"
              onClick={this.handlePushClick}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
