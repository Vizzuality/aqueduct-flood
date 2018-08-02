import React from "react";

// Components
import Page from "layout/page";

// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import AnalyzerCompare from "layout/analyzer-compare";

class HomePage extends Page {
  render() {
    return <AnalyzerCompare />;
  }
}

export default withRedux(initStore, null, {})(HomePage);
