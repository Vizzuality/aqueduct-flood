import React, { PureComponent } from "react";
import { Base64 } from 'js-base64';

// Components
import CompareLayout from "layout/compare";

class ComparePage extends PureComponent {
  componentWillMount() {
    const { 
      router: { payload, query },
      setTab,
      setWidgets,
      setWidgetsCompare,
      setCommonFilter,
      setRiskFilter,
      setHazardFilter,
      setCostFilter,
      setCommonCompareFilter,
      setRiskCompareFilter,
      setHazardCompareFilter,
      setCostCompareFilter,
      setExistingProt,
      setProtFut,
      setExistingProtCompare,
      setProtFutCompare
    } = this.props;
    const { tab } = payload;
    const { p } = query || {};

    let params = {}

    if (p) {
      params = JSON.parse(Base64.decode(decodeURIComponent(p)));
      const { filters, filtersCompare } = params;
      const { common, risk, hazard, cba } = filters;
      const {
        common: commonCompare,
        risk: riskCompare,
        hazard: hazardCompare,
        cba: cbaCompare
      } = filtersCompare;

      // filters
      setCommonFilter(common);
      setRiskFilter(risk);
      setHazardFilter(hazard);
      setCostFilter(cba);

      // compare filters
      setCommonCompareFilter(commonCompare);
      setRiskCompareFilter(riskCompare);
      setHazardCompareFilter(hazardCompare);
      setCostCompareFilter(cbaCompare);

      if (cba.existing_prot) setExistingProt(cba.existing_prot);
      if (cba.prot_fut) setProtFut(cba.prot_fut);

      if (cbaCompare.existing_prot) setExistingProtCompare(cbaCompare.existing_prot);
      if (cbaCompare.prot_fut) setProtFutCompare(cbaCompare.prot_fut);
    }

    if (tab) {
      let _tab = tab;
     
      if (params && params.filtersCompare) {
        const { risk: { advanced_settings: advancedSettingsCompare } } = params.filtersCompare;
        const { risk: { advanced_settings: advancedSettings } } = params.filters;

        const _advancedSettings = (advancedSettingsCompare || advancedSettings);

        setTab(_tab);
        setRiskFilter({ advanced_settings: _advancedSettings })
        setRiskCompareFilter({ advanced_settings: _advancedSettings });
        setWidgets({ nextTab: _advancedSettings ? 'advanced_risk' : _tab });
        setWidgetsCompare({ nextTab: _advancedSettings ? 'advanced_risk' : _tab });
      }
    }
  }

  render() {
    return (<CompareLayout />);
  }
}

export default ComparePage;
