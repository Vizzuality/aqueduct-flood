import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Sidebar } from 'aqueduct-components';

// components
import LayoutCBAEmbed from "layout/layout-cba-embed";
import Analyzer from 'components/analyzer';
import AnalyzerOutputs from 'components/analyzer/outputs';

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
      setSidebarVisibility
    } = this.props;
    const sidebarClass = classnames('l-sidebar', { '-hazard-tab': tab === 'hazard' });

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
