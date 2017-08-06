// @flow

import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";
import { If, Then } from "react-if";

import React from "react";
import idx from "idx";
import classNames from "classnames";
// import PropTypes from "prop-types";
import ICodeMirror from "codemirror";
import { isUndefined, size, keys, head } from "lodash";

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
  onSaveIconClick: ((Event, string | null | void) => void) | void
};

export default class CodeMirror extends React.Component<Props, Props, void> {
  codeElement: HTMLDivElement;
  editor: ICodeMirror.Editor;
  static defaultProps: Props = {
    mode: "cuda",
    currentFile: "",
    withMenuBar: false,
    files: {},
    fontSize: 14,
    readOnly: false,
    onNewIconClick: undefined,
    onSaveIconClick: undefined
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
        await import("codemirror/mode/dockerfile/dockerfile");
        return "docker";
      default:
        return "jsx";
    }
  }
  onChange = () => {
    console.log(arguments);
  };
  async componentDidMount() {
    const mode = await this.getMode(this.props.mode);
    const currentFile =
      size(this.props.files) === 1 && this.props.currentFile === ""
        ? head(keys(this.props.files))
        : this.props.currentFile;
    const value = idx(this.props, _ => _.files[currentFile].content) || "";
    // eslint-disable-next-line new-cap
    this.editor = ICodeMirror(this.codeElement, {
      value,
      mode,
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
              <Menu.Menu position="right">
                <Dropdown item simple text="Files">
                  <Dropdown.Menu>
                    {keys(this.props.files).map((name: string) => {
                      return (
                        <Dropdown.Item
                          text={name}
                          key={this.props.files[name].uuid}
                        />
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Then>
          </If>
        </Menu>

        <Segment attached="bottom" style={{ paddingTop: 0 }}>
          {mainElement}
        </Segment>
      </div>
    );
  }
}
