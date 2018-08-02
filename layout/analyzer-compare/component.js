import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'aqueduct-components';

// layout
import Layout from "layout/layout";

// components
import AnalyzerCompare from 'components/analyzer-compare';

// constants
import { APP_TABS } from 'constants/app';

// styles
import './styles.scss';

class AnalyzerComparePage extends PureComponent {
  static propTypes = { setTab: PropTypes.func.isRequired }

  render() {
    const { setTab } = this.props;

    return (
      <Layout title="Cost-benefit Analyzer Compare" description="Aqueduct Flood description">
        <div className="l-analyzer-compare">
          <div className="l-tabs">
            <div className="wrapper">
              <Tabs
                tabs={APP_TABS}
                onChange={({ value }) => setTab(value)}
              />
            </div>
          </div>
          <AnalyzerCompare />
        </div>
      </Layout>
    );
  }
}

export default AnalyzerComparePage;
