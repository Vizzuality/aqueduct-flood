import React from "react";
import { Base64 } from 'js-base64';

// redux
import withRedux from "next-redux-wrapper";
import initStore from "store";

// components
import Page from "layout/page";
import WidgetEmbed from "layout/widget-embed";

// actions
import { setTab } from 'modules/app/actions';
import { setEmbedWidget } from 'modules/widgets/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';

class WidgetEmbedPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { store, query } = context;
    const { tab: queryTab, id } = query;

    if (queryTab) {
      store.dispatch(setTab(queryTab));
      store.dispatch(setEmbedWidget({
        nextTab: queryTab,
        id
      }));
    }

    if (query.p) {
      const filters = JSON.parse(Base64.decode(decodeURIComponent(query.p)));
      const { common, risk, hazard, cba } = filters;

      store.dispatch(setCommonFilter(common));
      store.dispatch(setRiskFilter(risk));
      store.dispatch(setHazardFilter(hazard));
      store.dispatch(setCostFilter(cba));
    }

    return { ...props };
  }

  render() {
    return <WidgetEmbed />;
  }
}

export default withRedux(
  initStore,
  null,
  null
)(WidgetEmbedPage);
