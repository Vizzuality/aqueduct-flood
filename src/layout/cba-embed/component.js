import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Sidebar, Tabs } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';
import { Base64 } from 'js-base64';

// layout
import LayoutCBAEmbed from "layout/layout-cba-embed";

// components
import Risk from 'components/risk';
import Analyzer from 'components/analyzer';
import Hazard from 'components/hazard';
import HazardMap from 'components/hazard/map';
import AnalyzerOutputs from 'components/analyzer/outputs';
import RiskOutputs from 'components/risk/outputs';

// utils
import { logEvent } from 'utils/analytics';

// styles
import './styles.scss';

class Home extends PureComponent {
  static propTypes = {
    sidebar: PropTypes.bool.isRequired,
    tab: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    mapOptions: PropTypes.object.isRequired,
    hazardLegend: PropTypes.object.isRequired,
    activeLayers: PropTypes.array.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired,
    setWidgetsCompare: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    clearLayers: PropTypes.func.isRequired
  }

  onChangeTab = ({ value }) => {
    const {
      setTab,
      setWidgets,
      setWidgetsCompare,
      clearInput,
      clearLayers,
      setRouter
    } = this.props;

    setRouter('home', { tab: value });
    setTab(value);
    setWidgets({ nextTab: value });
    setWidgetsCompare({ nextTab: value })
    clearInput();
    clearLayers();


    logEvent('[AQ-Flood]', 'user changes tab', value);
  }

  render() {
    const {
      sidebar,
      tab,
      tabs,
      setSidebarVisibility
    } = this.props;

    const isAnalyzerTab = tab === 'cba';
    const isRiskTab = tab === 'risk';
    const isHazardTab = tab === 'hazard';

    const sidebarClass = classnames(
      'l-sidebar',
      { '-hazard-tab': isHazardTab }
    );

    return (
      <LayoutCBAEmbed title="Homepage" description="Aqueduct Flood description">
        <section className="l-home">
          <Sidebar
            visible={sidebar}
            onToggle={nextVisible => { setSidebarVisibility(nextVisible)}}
            customClass={sidebarClass}
          >
            <div className="overflow-container">
              <Analyzer />              
            </div>
          </Sidebar>

          <AnalyzerOutputs />
        </section>
      </LayoutCBAEmbed>
    );
  }
}

export default Home;
