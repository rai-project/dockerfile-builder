import React, { createElement } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/highlight";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import hljsYaml from "highlight.js/lib/languages/yaml";
import marksy from "marksy/components";

hljs.registerLanguage("javascript", hljsJavascript);
hljs.registerLanguage("yaml", hljsYaml);

const description = `

# Motivation

The current PowerPC container community lags behind that of X86 and ARM.
Part of this is because software developers are unable to publish docker
images without access to a PowerPC system. Docker for Power (D4P) is a
platform to develop and deploy PowerPC containers within a web browser
without access to a local PowerPC system.

# Purpose

The aim of D4P is to enrich the PowerPC container ecosystem by providing
both a platform for developers to create docker containers, and for
PowerPC community to find docker images. Already, we have built and
published over 200 docker images that are available in the D4P image
catalog.  User contribution is key to extend D4P's catalog.

# Future Work

D4P is slated to be the hub for the PowerPC community to create, discover,
and use docker images.  Future work will provide a page which showcases
work done using container technology on PowerPC. We also plan on adding
articles detailing the best practices to follow while using containers
on PowerPC along with some tips and tricks.


`;

export default function About() {
  const compile = marksy({
    createElement,
    highlight(language, code) {
      return hljs.highlight(language, code).value;
    }
  });
  return <div> {compile(section, null, {}).tree}</div>;
}
