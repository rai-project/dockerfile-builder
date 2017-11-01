import React from "react";
import Markdown from "../Markdown";

// eslint-disable-next-line import/no-webpack-loader-syntax
import description from "!raw-loader!./About.md";

export default function About() {
  return <Markdown data={description} />;
}
