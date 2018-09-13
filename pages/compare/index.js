import React from "react";

// Components
import Page from "layout/page";

// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import AnalyzerCompare from "layout/compare";

class Compare extends Page {
  render() {
    return <AnalyzerCompare />;
  }
}

export default withRedux(initStore, null, {})(Compare);
