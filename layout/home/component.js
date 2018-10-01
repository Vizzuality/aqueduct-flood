import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Sidebar,
  Tabs
} from 'aqueduct-components';

// layout
import Layout from "layout/layout";

// components
import Risk from 'components/risk';
import Analyzer from 'components/analyzer';
import Hazard from 'components/hazard';
import HazardMap from 'components/hazard/map';
import AnalyzerOutputs from 'components/analyzer/outputs';
import RiskOutputs from 'components/risk/outputs';

// constants
import { APP_TABS } from 'constants/app';

// styles
import './styles.scss';

class Home extends PureComponent {
  static propTypes = {
    sidebar: PropTypes.bool.isRequired,
    tab: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    clearLayers: PropTypes.func.isRequired
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
      filters,
      setSidebarVisibility
    } = this.props;

    const isAnalyzerTab = tab === 'cba';
    const isRiskTab = tab === 'risk';
    const isHazardTab = tab === 'hazard';
    const { existing_prot: existingProt, prot_fut: protFut } = filters.cba;
    const { existing_prot: existingProtRisk } = filters.risk;
    const AnalyzertabReady = !!existingProt && !!protFut;
    const RiskTabReady = !!existingProtRisk;

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
                tabs={APP_TABS}
                onChange={this.onChangeTab}
                customClass="l-tabs"
              />
              {isAnalyzerTab && <Analyzer />}
              {isRiskTab && <Risk />}
              {isHazardTab && <Hazard />}
            </div>
          </Sidebar>

          {isAnalyzerTab && AnalyzertabReady && <AnalyzerOutputs />}
          {isRiskTab && RiskTabReady && <RiskOutputs />}
          {(!isAnalyzerTab && !isRiskTab) && <HazardMap />}

        </section>
      </Layout>
    );
  }
}

export default Home;
