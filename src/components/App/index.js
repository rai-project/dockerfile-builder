import React from "react";
import { Helmet } from "react-helmet";

import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import { Sidebar, Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Header from "./Header";
import { HomePage } from "../Pages";
import Footer from "./Footer";
import Snackbar from "./Snackbar";

import Logo from "./Logo";
import Terminal from "../Terminal";

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
    title: state`app.name`,
    currentPage: state`app.currentPage`,
    appLoaded: signal`app.appLoaded`,
    appName: state`app.name`,
    websiteUrl: state`websiteUrl`
  },
  class App extends React.Component {
    componentDidMount() {
      // this.props.appLoaded();
    }
    render() {
      const { title, currentPage, websiteUrl } = this.props;

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
              {title}
            </title>
            <link rel="canonical" href={websiteUrl} />
          </Helmet>
          <Sidebar.Pushable as={Segment}>
            <Sidebar.Pusher style={{ border: 0, borderRadius: 0 }}>
              <Body>
                {/* <Snackbar /> */}
                <div className="App-content">
                  <Segment inverted vertical>
                    <Navbar />
                    <Header />
                  </Segment>
                  <Container
                    className="App-body"
                    style={{ borderRadius: 0, border: 0 }}
                  >
                    <Page key={"page-" + currentPage} />
                  </Container>
                </div>
                <div className="App-footer">
                  <Segment inverted vertical>
                    <Footer />
                  </Segment>
                </div>
              </Body>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      );
    }
  }
);
