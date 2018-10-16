import React from "react";
import { Base64 } from 'js-base64';

// components
import Page from "layout/page";

// redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import Home from "layout/home";

// actions
import { setRoutes } from 'modules/routes/actions';
import { setTab } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';
import { setActiveLayer } from "modules/layers/actions";
import { setMapOptions } from "modules/map/actions";

class HomePage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { store, pathname, query, asPath } = context;
    const { tab: queryTab } = query;

    if (queryTab) {
      store.dispatch(setTab(queryTab));
      store.dispatch(setWidgets({ nextTab: queryTab }))
    }

    store.dispatch(setRoutes({
      pathname,
      query,
      asPath
    }));

    if (query.p) {
      const filters = JSON.parse(Base64.decode(decodeURIComponent(query.p)));
      const {
        common,
        risk,
        hazard,
        cba,
        activeLayers,
        map
      } = filters;

      store.dispatch(setCommonFilter(common));
      store.dispatch(setRiskFilter(risk));
      store.dispatch(setHazardFilter(hazard));
      store.dispatch(setCostFilter(cba));
      store.dispatch(setMapOptions({ ...map }))

      // don't like this too much... Review later
      console.log(activeLayers)
      if(activeLayers) store.dispatch(setActiveLayer(activeLayers));
    }

    return { ...props };
  }

  render() {
    return <Home />;
  }
}

export default withRedux(
  initStore,
  null,
  null
)(HomePage);
