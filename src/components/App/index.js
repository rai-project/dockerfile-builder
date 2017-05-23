import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import React from "react";

import { default as GrommetApp } from "grommet/components/App";
import Headline from "grommet/components/Headline";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Image from "grommet/components/Image";
import Article from "grommet/components/Article";
import Section from "grommet/components/Section";
import Footer from "grommet/components/Footer";
import Paragraph from "grommet/components/Paragraph";
// import Logo from 'grommet/components/Logo';
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Heading from "grommet/components/Heading";

import CodeMirror from "../CodeMirror";
import Monaco from "../Monaco";
import Logo from "../Logo";
import Terminal from "../Terminal";

// eslint-disable-next-line import/no-webpack-loader-syntax
import placeholder from "!raw!./placeholder.svg";

function placeholderImage(width, height) {
  // We need to base64 encode this because otherwise FF will add extra escape chars
  const dataUri = btoa(
    placeholder.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim()
  );
  console.log("data:image/svg+xml;base64," + dataUri);
  return "data:image/svg+xml;base64," + dataUri;
}

export default connect(
  { title: state`app.name` },
  class App extends React.Component {
    render() {
      const title = this.props.title;
      return (
        <div id={"app-wrapper"}>
          <GrommetApp>
            <Header
              size="large"
              pad={{ horizontal: "medium", between: "small" }}
              responsive={false}
              justify="between"
            >
              <Title responsive={true}>
                <Logo size={"thumb"} fit={"contain"} />
                <h1>{title}</h1>
              </Title>
            </Header>
            <Article
              scrollStep={false}
              controls={true}
              justify={"between"}
              pad={"none"}
            >
              <Section alignContent={"start"} justify={"start"} pad="large">
                {/*<Heading margin={'none'} justify={'left'}>
									CodeMirror
								</Heading>*/}
                <CodeMirror />
                <Terminal />
              </Section>
              <Section alignContent={"start"} justify={"start"}>
                {/*<Terminal />*/}
              </Section>
            </Article>
            <Footer
              float={true}
              pad={{
                vertical: "small",
                horizontal: "medium",
                between: "medium"
              }}
              wrap={true}
              direction="row"
              justify="center"
              align="center"
            >
              <Box direction="row" align="center" pad={{ between: "medium" }}>
                <Paragraph margin="none">
                  © 2017 Abdul Dakkak
                </Paragraph>
                {/*<Menu direction="row" size="small" dropAlign={{ right: 'right' }}>
									<Anchor href="#">
										Contact
									</Anchor>
									<Anchor href="#">
										About
									</Anchor>
								</Menu>*/}
              </Box>
            </Footer>
          </GrommetApp>
        </div>
      );
    }
  }
);
