import React from "react";
import { Helmet } from "react-helmet";

import { connect } from "cerebral/react";
import { state } from "cerebral/tags";
import { Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

// import Navbar from "./Navbar";
import Header from "./Header";
import { HomePage } from "../Pages";
import Footer from "./Footer";
import Snackbar from "./Snackbar";

// import Logo from "./Logo";

import "./App.css";

import "../../common/extract";

const Body = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default connect(
  {
    // eslint-disable-next-line
    appName: state`app.name`,
    currentPage: state`app.currentPage`,
    websiteUrl: state`app.websiteUrl`
  },
  class App extends React.Component {
    render() {
      const { appName, currentPage, websiteUrl } = this.props;

      let Page = null;
      switch (currentPage) {
        default:
          Page = HomePage;
          break;
      }

      return (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              {appName}
            </title>
            <link rel="canonical" href={websiteUrl} />
          </Helmet>
          <Body>
            <Snackbar />
            <div className="App-content">
              <Segment inverted vertical attached="top">
                <Header appName={appName} currentPage={currentPage} />
              </Segment>
              <Container
                className="App-body"
                style={{ borderRadius: 0, border: 0 }}
              >
                <Page key={"page-" + currentPage} />
              </Container>
            </div>
            <div className="App-footer">
              <Segment
                inverted
                vertical
                attached="bottom"
                style={{ borderRadius: 0, border: 0 }}
              >
                <Footer />
              </Segment>
            </div>
          </Body>
        </div>
      );
    }
  }
);
