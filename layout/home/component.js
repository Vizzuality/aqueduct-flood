import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Sidebar,
  Tabs
} from 'aqueduct-components';
import Map, {
  MapControls,
  ZoomControl
} from 'wri-api-components/dist/map';

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
    filters: PropTypes.object.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired
  }

  render() {
    const {
      sidebar,
      tab,
      setSidebarVisibility,
      setTab,
      filters
    } = this.props;

    const isAnalyzerTab = tab === 'cost-benefit-analyzer';
    const { existing_prot: existingProt, prot_fut: protFut } = filters;
    const analyzerTabIsReady = !!existingProt && !!protFut;

    return (
      <Layout title="Homepage" description="Aqueduct Flood description">
        <section className="l-home">
          <Sidebar
            visible={sidebar}
            onToggle={nextVisible => { setSidebarVisibility(nextVisible)}}
            customClass="l-sidebar"
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

          {isAnalyzerTab && analyzerTabIsReady && <AnalyzerOutputs />}

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
