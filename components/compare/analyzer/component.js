import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    tab: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    setWidgetsCompare: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { tab, setWidgetsCompare } = this.props;

    setWidgetsCompare({ nextTab: tab });
  }

  render() {
    const { filters, filtersCompare } = this.props;
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
                {location && <AnalyzerInputs />}
              </div>
              <div className="col-md-6">
                {locationCompare && <AnalyzerCompareInputs />}
              </div>
            </div>
          </div>
        </div>

        <div className="analyzer-compare-outputs">
          <AnalyzerCompareOutputs />
        </div>

        <ApplyFilters />
      </div>)
  }
}

export default AnalyzerCompare;
