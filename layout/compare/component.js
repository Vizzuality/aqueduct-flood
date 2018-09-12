import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'aqueduct-components';

// layout
import Layout from "layout/layout";

// components
import RiskCompare from 'components/compare/risk';
import AnalyzerCompare from 'components/compare/analyzer';

// constants
import { APP_TABS } from 'constants/app';

// styles
import './styles.scss';

class ComparePage extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    setTab: PropTypes.func.isRequired
  }

  render() {
    const { setTab, tab } = this.props;

    return (
      <Layout title="Compare" description="Aqueduct Flood description">
        <div className="l-compare">
          <div className="l-tabs">
            <div className="wrapper">
              <Tabs
                tabs={APP_TABS}
                onChange={({ value }) => setTab(value)}
              />
            </div>
          </div>
          {tab === 'risk' && <RiskCompare />}
          {tab === 'hazard' && <AnalyzerCompare />}
          {tab === 'cba' && <AnalyzerCompare />}
        </div>
      </Layout>
    );
  }
}

export default ComparePage;
