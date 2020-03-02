import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'aqueduct-components';

// components
import Layout from "layout/layout";
import RiskCompare from 'components/compare/risk';
import AnalyzerCompare from 'components/compare/analyzer';

// utils
import { logEvent } from 'utils/analytics';

// styles
import './styles.scss';

class ComparePage extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
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
      clearCompareFilters,
      setRouter
    } = this.props;

    setRouter('compare', { tab: value });
    setTab(value);
    setWidgets({ nextTab: value });
    setWidgetsCompare({ nextTab: value })

    clearInput();
    clearInputCompare();

    clearFilters();
    clearCompareFilters();

    logEvent('[AQ-Flood]', 'user changes tab in compare', value);
  }

  render() {
    const { tab, tabs } = this.props;

    return (
      <Layout title="Compare" description="Aqueduct Flood description">
        <div className="l-compare">
          <div className="l-tabs">
            <div className="wrapper">
              <Tabs
                tabs={tabs}
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
