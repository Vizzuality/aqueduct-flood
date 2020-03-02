import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import LayoutCBAEmbed from "layout/layout-cba-embed";
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
    return (
      <LayoutCBAEmbed title="Compare" description="Aqueduct Flood description">
        <div className="l-compare">
          <AnalyzerCompare />
        </div>
      </LayoutCBAEmbed>
    );
  }
}

export default ComparePage;
