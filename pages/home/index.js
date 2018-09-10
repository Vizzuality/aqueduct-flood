import React from "react";

// Components
import Page from "layout/page";


// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import Home from "layout/home";

class HomePage extends Page {
  render() {
    return <Home />;
  }
}

export default withRedux(
  initStore,
  null,
  {}
)(HomePage);
