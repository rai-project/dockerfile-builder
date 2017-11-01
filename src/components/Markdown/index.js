import React, { createElement } from "react";
import { isNil } from "lodash";
import hljs from "highlight.js/lib/highlight";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import hljsYaml from "highlight.js/lib/languages/yaml";
import marksy from "marksy/components";
import { List, Message, Header } from "semantic-ui-react";
import yeast from "yeast";

import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", hljsJavascript);
hljs.registerLanguage("yaml", hljsYaml);

const compile = marksy({
  createElement,
  elements: {
    highlight(language, code) {
      return hljs.highlight(language, code).value;
    },
    h1({ id, children }) {
      return <Header as="h1">{children}</Header>;
    },
    h2({ id, children }) {
      return <Header as="h2">{children}</Header>;
    },
    h3({ id, children }) {
      return <Header as="h3">{children}</Header>;
    },
    h4({ id, children }) {
      return <Header as="h4">{children}</Header>;
    },
    blockquote({ children }) {
      return <Message>{children}</Message>;
    },
    ol({ children }) {
      return (
        <List ordered>
          {children.map(
            child =>
              child ? <List.Item key={yeast()}>{child}</List.Item> : null
          )}
        </List>
      );
    },
    ul({ children }) {
      return (
        <List>
          {children.map(
            child =>
              child ? <List.Item key={yeast()}>{child}</List.Item> : null
          )}
        </List>
      );
    }
  },
  components: {}
});

export default class Markdown extends React.Component {
  state = { urlData: null };

  componentDidMount() {
    const { url } = this.props;
    if (isNil(url)) {
      return;
    }
    fetch(url)
      .then(res => res.text())
      .then(urlData => this.setState({ urlData }));
  }
  render() {
    let { data } = this.props;
    if (!isNil(this.state.urlData)) {
      data = this.state.urlData;
    }
    if (!isNil(data)) {
      return <div>{compile(data, null, {}).tree}</div>;
    }

    return <div>loading...</div>;
  }
}
