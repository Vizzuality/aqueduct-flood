import React from "react";

// Components
import Page from "layout/page";

// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";

// TO-DO
class HomePage extends Page {
  render() {
    return (
      <div>
        Compare goes here
      </div>);
  }
}

export default withRedux(initStore, null, {})(HomePage);
