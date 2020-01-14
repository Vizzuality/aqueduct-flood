import React, { PureComponent } from "react";
import { Base64 } from 'js-base64';

// components
import CBAEmbedLayout from "layout/cba-embed";

class CBAEmbed extends PureComponent {
  componentWillMount() {
    const { 
      routes,
      setTab,
      setWidgets,
      setCommonFilter,
      setCostFilter,
      setMapOptions,
      setIsNullTime,
      setExistingProt,
      setProtFut,
      setActiveLayer
    } = this.props;
    const {  query } = routes;
    const { p } = query || {};

    setTab('cba');
    setWidgets({ nextTab: 'cba' });

    if (p) {
      const filters = JSON.parse(Base64.decode(decodeURIComponent(p)));
      const {
        common,
        cba,
        activeLayers,
        map
      } = filters;

      setCommonFilter(common);
      setCostFilter(cba);
      setMapOptions({ ...map });

      if (cba.existing_prot) {
        setIsNullTime(false);
        setExistingProt(cba.existing_prot);
      }

      if (cba.prot_fut) setProtFut(cba.prot_fut);

      if (activeLayers) setActiveLayer(activeLayers);
    }
  }

  render() {
    return <CBAEmbedLayout />;
  }
}

export default CBAEmbed;
