import React, { PureComponent } from "react";
import { Base64 } from 'js-base64';

// components
import Home from "layout/home";

class HomePage extends PureComponent {
  componentWillMount() {
    const { 
      routes,
      setTab,
      setWidgets,
      setCommonFilter,
      setRiskFilter,
      setHazardFilter,
      setCostFilter,
      setMapOptions,
      setIsNullTime,
      setExistingProt,
      setProtFut,
      setReturnPeriod,
      setActiveLayer
    } = this.props;
    const { 
      payload: { tab },
      query
    } = routes;
    const { p } = query || {};

    if (tab) {
      setTab(tab);
      setWidgets({ nextTab: tab });
    }

    if (p) {
      const filters = JSON.parse(Base64.decode(decodeURIComponent(p)));
      const {
        common,
        risk,
        hazard,
        cba,
        activeLayers,
        map
      } = filters;

      setCommonFilter(common);
      setRiskFilter(risk);
      setHazardFilter(hazard);
      setCostFilter(cba);
      setMapOptions({ ...map });

      if (cba.existing_prot) {
        setIsNullTime(false);
        setExistingProt(cba.existing_prot);
      }

      if (cba.prot_fut) setProtFut(cba.prot_fut);

      if (map.returnPeriod) setReturnPeriod(map.returnPeriod);

      if (activeLayers) setActiveLayer(activeLayers);
    }
  }

  render() {
    return <Home />;
  }
}

export default HomePage;
