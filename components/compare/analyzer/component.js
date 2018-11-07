import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';

// components
import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import AnalyzerCompareInputs from 'components/compare/analyzer/analyzer-inputs';
import AnalyzerCompareOutputs from 'components/compare/analyzer/outputs';
import AnalyzerCompareFilters from 'components/compare/analyzer/filters';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class AnalyzerCompare extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    loadingDefaults: PropTypes.bool.isRequired,
    loadingCompareDefaults: PropTypes.bool.isRequired,
    widgetLoading: PropTypes.bool.isRequired
  }

  render() {
    const {
      loadingDefaults,
      loadingCompareDefaults,
      widgetLoading,
      filters,
      filtersCompare
    } = this.props;
    const { geogunit_unique_name: location } = filters;
    const { geogunit_unique_name: locationCompare } = filtersCompare;

    return (
      <div className="c-analyzer-compare">
        <div className="l-filters">
          <AnalyzerCompareFilters />
        </div>

        <div className="analyzer-compare-inputs">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-6">
                {loadingDefaults && (
                  <div className="spinner-container">
                    <Spinner className="-transparent" />
                  </div>)}
                {(location && !loadingDefaults) && <AnalyzerInputs />}
              </div>
              <div className="col-md-6">
                {loadingCompareDefaults && (
                  <div className="spinner-container">
                    <Spinner className="-transparent" />
                  </div>)}
                {(locationCompare && !loadingCompareDefaults) && <AnalyzerCompareInputs />}
              </div>
            </div>
          </div>
        </div>

        <div className="analyzer-compare-outputs">
          <AnalyzerCompareOutputs />
        </div>

        {(!(loadingDefaults || loadingCompareDefaults) && !widgetLoading) && <ApplyFilters />}
      </div>)
  }
}

export default AnalyzerCompare;
