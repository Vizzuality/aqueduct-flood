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
    setTab: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired,
    setWidgetsCompare: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    clearInputCompare: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired
  }

  onChangeTab = ({ value }) => {
    const {
      setTab,
      setWidgets,
      setWidgetsCompare,
      clearInput,
      clearInputCompare,
      clearFilters,
      clearCompareFilters
    } = this.props;

    setTab(value);
    setWidgets({ nextTab: value });
    setWidgetsCompare({ nextTab: value })

    clearInput();
    clearInputCompare();

    clearFilters();
    clearCompareFilters();
  }

  render() {
    const { tab } = this.props;

    return (
      <Layout title="Compare" description="Aqueduct Flood description">
        <div className="l-compare">
          <div className="l-tabs">
            <div className="wrapper">
              <Tabs
                tabs={APP_TABS}
                onChange={this.onChangeTab}
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
