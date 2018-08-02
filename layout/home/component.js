import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Sidebar,
  Tabs
} from 'aqueduct-components';
import {
  Map,
  MapControls,
  ZoomControl
} from 'wri-api-components';

// layout
import Layout from "layout/layout";

// components
import Analyzer from 'components/analyzer';
import AnalyzerOutputs from 'components/analyzer/outputs';

// constants
import { APP_TABS } from 'constants/app';

// styles
import './styles.scss';

class Home extends PureComponent {
  static propTypes = {
    sidebar: PropTypes.bool.isRequired,
    tab: PropTypes.string.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired
  }

  render() {
    const {
      sidebar,
      tab,
      setSidebarVisibility,
      setTab
    } = this.props;

    const isAnalyzerTab = tab === 'cost-benefit-analyzer';

    return (
      <Layout title="Homepage" description="Aqueduct Flood description">
        <section className="l-home">
          <div className="l-sidebar">
            <Sidebar
              visible={sidebar}
              onToggle={nextVisible => { setSidebarVisibility(nextVisible)}}
              customClass="sidebar"
            >
              <div className="overflow-container">
                <Tabs
                  tabs={APP_TABS}
                  onChange={({ value }) => setTab(value)}
                  customClass="l-tabs"
                />
                {isAnalyzerTab && <Analyzer />}
              </div>
            </Sidebar>
          </div>

          {isAnalyzerTab && <AnalyzerOutputs />}

          {!isAnalyzerTab && (
            <Map customClass="l-map">
              {(map) => (
                <MapControls>
                  <ZoomControl map={map} />
                </MapControls>
              )}
            </Map>)}

        </section>
      </Layout>
    );
  }
}

export default Home;
