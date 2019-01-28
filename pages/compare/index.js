import React from "react";
import { Base64 } from 'js-base64';

// Components
import Page from "layout/page";

// Redux
import withRedux from "next-redux-wrapper";
import initStore from "store";
import CompareLayout from "layout/compare";

// actions
import { setTab } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { setWidgetsCompare } from 'modules/widgets-compare/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';
import {
  setCommonCompareFilter,
  setRiskCompareFilter,
  setHazardCompareFilter,
  setCostCompareFilter,
} from 'modules/filters-compare/actions';
import {
  setExistingProt,
  setProtFut,
  setExistingProtCompare,
  setProtFutCompare
} from 'modules/widget-map/actions';


class Compare extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { store, query } = context;
    const { tab: queryTab } = query;

    let params = {}

    if (query.p) {
      params = JSON.parse(Base64.decode(decodeURIComponent(query.p)));
      const { filters, filtersCompare } = params;
      const { common, risk, hazard, cba } = filters;
      const {
        common: commonCompare,
        risk: riskCompare,
        hazard: hazardCompare,
        cba: cbaCompare
      } = filtersCompare;

      // filters
      store.dispatch(setCommonFilter(common));
      store.dispatch(setRiskFilter(risk));
      store.dispatch(setHazardFilter(hazard));
      store.dispatch(setCostFilter(cba));

      // compare filters
      store.dispatch(setCommonCompareFilter(commonCompare));
      store.dispatch(setRiskCompareFilter(riskCompare));
      store.dispatch(setHazardCompareFilter(hazardCompare));
      store.dispatch(setCostCompareFilter(cbaCompare));

      if (cba.existing_prot) store.dispatch(setExistingProt(cba.existing_prot));
      if (cba.prot_fut) store.dispatch(setProtFut(cba.prot_fut));

      if (cbaCompare.existing_prot) store.dispatch(setExistingProtCompare(cbaCompare.existing_prot));
      if (cbaCompare.prot_fut) store.dispatch(setProtFutCompare(cbaCompare.prot_fut));
    }

    if (queryTab) {
      store.dispatch(setTab(queryTab));

      if (params && params.filtersCompare) {
        store.dispatch(setWidgets({
          nextTab: queryTab,
          advancedSettings: params.filters.risk ? params.filters.risk.advanced_settings : false
        }));
        store.dispatch(setWidgetsCompare({
          nextTab: queryTab,
          advancedSettings: params.filtersCompare.risk ? params.filtersCompare.risk.advanced_settings : false
        }));
      }
    }

    return { ...props };
  }

  render() {
    return <CompareLayout />;
  }
}

export default withRedux(initStore, null, {})(Compare);
