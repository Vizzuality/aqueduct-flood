import React, { PureComponent } from "react";
import { Base64 } from 'js-base64';

// components
import WidgetEmbed from "layout/widget-embed";

class WidgetEmbedPage extends PureComponent {
  componentWillMount() {
    const { 
      router: { payload, query },
      setTab,
      setEmbedWidget,
      setCommonFilter,
      setRiskFilter,
      setHazardFilter,
      setCostFilter
    } = this.props;
    const { tab, id } = payload;
    const { p } = query;

    if (tab) {
      setTab(tab);
      setEmbedWidget({
        nextTab: tab,
        id
      });
    }

    if (p) {
      const filters = JSON.parse(Base64.decode(decodeURIComponent(p)));
      const { common, risk, hazard, cba } = filters;

      setCommonFilter(common);
      setRiskFilter(risk);
      setHazardFilter(hazard);
      setCostFilter(cba);
    }
  }

  render() {
    return (<WidgetEmbed />);
  }
}

export default WidgetEmbedPage;
