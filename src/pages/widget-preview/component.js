import React, { PureComponent } from "react";
import { Base64 } from 'js-base64';

// components
import WidgetPreview from "layout/widget-preview";

class WidgetPreviewPage extends PureComponent {
  componentWillMount() {
    const { 
      router: { payload, query },
      setTab,
      setWidgets,
      setEmbedWidget,
      setCommonFilter,
      setRiskFilter,
      setHazardFilter,
      setCostFilter
    } = this.props;
    const { tab, id } = payload;
    const { p } = query || {};

    const filters = p ? JSON.parse(Base64.decode(decodeURIComponent(p))) : null;

    if (tab) {
      let _tab = tab;
      
      if (filters) {
        const { risk: { advanced_settings } } = filters;
        if (advanced_settings) _tab = 'advanced_risk'; 
      }

      setTab(_tab);
      setWidgets({ nextTab: _tab });
      
      setEmbedWidget({
        nextTab: _tab,
        id
      });
    }

    if (filters) {
      const { common, risk, hazard, cba } = filters;

      setCommonFilter(common);
      setRiskFilter(risk);
      setHazardFilter(hazard);
      setCostFilter(cba);
    }
  }

  render() {
    return (<WidgetPreview />);
  }
}

export default WidgetPreviewPage;
