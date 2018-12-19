import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import classnames from 'classnames';
import { Sidebar, Tabs } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';
import { Base64 } from 'js-base64';

// layout
import Layout from "layout/layout";

// components
import Risk from 'components/risk';
import Analyzer from 'components/analyzer';
import Hazard from 'components/hazard';
import HazardMap from 'components/hazard/map';
import AnalyzerOutputs from 'components/analyzer/outputs';
import RiskOutputs from 'components/risk/outputs';

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
    clearInput: PropTypes.func.isRequired,
    clearLayers: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters,
      activeLayers,
      mapOptions,
      tab,
      hazardLegend,
    } = this.props;
    const {
      filters: nextFilters,
      activeLayers: nextActiveLayers,
      mapOptions: nextMapOptions,
      hazardLegend: nextHazardLegend,
      tab: nextTab
    } = nextProps;
    const tabChanged = tab !== nextTab;
    const mapOptionsChanged = !isEqual(mapOptions, nextMapOptions);
    const filtersChanged = !isEqual(filters, nextFilters);
    const activeLayersChanged = !isEqual(activeLayers, nextActiveLayers);
    const hazardLegendChanged = !isEqual(hazardLegend, nextHazardLegend);

    if (filtersChanged || mapOptionsChanged || activeLayersChanged || tabChanged || hazardLegendChanged) {
      Router.replaceRoute('home',
        {
          tab: nextTab,
          p: Base64.encode(JSON.stringify({
            ...nextFilters,
            activeLayers: nextActiveLayers.map(_layer => _layer.id),
            map: {
              ...nextMapOptions,
              ...nextHazardLegend
            }
          }))
        },
        { shallow: true });
    }
  }

  onChangeTab = ({ value }) => {
    const {
      setTab,
      setWidgets,
      clearInput,
      clearLayers
    } = this.props;

    setTab(value);
    setWidgets({ nextTab: value });
    clearInput();
    clearLayers();
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
      <Layout title="Homepage" description="Aqueduct Flood description">
        <section className="l-home">
          <Sidebar
            visible={sidebar}
            onToggle={nextVisible => { setSidebarVisibility(nextVisible)}}
            customClass={sidebarClass}
          >
            <div className="overflow-container">
              <Tabs
                tabs={tabs}
                onChange={this.onChangeTab}
                customClass="l-tabs"
              />
              {isAnalyzerTab && <Analyzer />}
              {isRiskTab && <Risk />}
              {isHazardTab && <Hazard />}
            </div>
          </Sidebar>

          {isAnalyzerTab && <AnalyzerOutputs />}
          {isRiskTab && <RiskOutputs />}
          {(!isAnalyzerTab && !isRiskTab) && <HazardMap />}

        </section>
      </Layout>
    );
  }
}

export default Home;
