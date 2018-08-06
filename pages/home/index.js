import React from "react";

// Components
import Page from "layout/page";

// actions
import { getLocations } from 'modules/locations/actions';

// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import Home from "layout/home";

class HomePage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { store } = context;

    // fetch locations
    await store.dispatch(getLocations());

    return { ...props };
  }

  render() {
    return <Home />;
  }
}

export default withRedux(
  initStore,
  null,
  {}
)(HomePage);
