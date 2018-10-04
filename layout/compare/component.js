import React, { PureComponent } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Tabs } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';
import { Base64 } from 'js-base64';

// layout
import Layout from "layout/layout";

// components
import RiskCompare from 'components/compare/risk';
import AnalyzerCompare from 'components/compare/analyzer';

// styles
import './styles.scss';

class ComparePage extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    routes: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    setTab: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired,
    setWidgetsCompare: PropTypes.func.isRequired,
    setRoutes:PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    clearInputCompare: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { routes, filters, filtersCompare, tab, setRoutes } = this.props;
    const {
      routes: nextRoutes,
      filters: nextFilters,
      filtersCompare: nextFiltersCompare,
      tab: nextTab
    } = nextProps;
    const tabChanged = tab !== nextTab;
    const routesChanged = !isEqual(routes, nextRoutes);
    const filtersChanged = !isEqual(filters, nextFilters);
    const filtersCompareChanged = !isEqual(filtersCompare, nextFiltersCompare);

    if (filtersChanged || filtersCompareChanged || tabChanged) {
      setRoutes({
        query: {
          ...routes.query,
          p: {
            filters: nextFilters,
            filtersCompare: nextFiltersCompare
          },
          tab: nextTab
        }
      });
    }

    if (routesChanged) {
      Router.replaceRoute('compare',
        {
          tab: nextTab,
          p: Base64.encode(JSON.stringify({
            filters: nextFilters,
            filtersCompare: nextFiltersCompare
          }))
        },
        { shallow: true });
    }
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
