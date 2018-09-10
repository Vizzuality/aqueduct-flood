import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';



// components
import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import AnalyzerCompareInputs from 'components/analyzer-compare/analyzer-inputs';
import AnalyzerCompareOutputs from 'components/analyzer-compare/outputs';
import AnalyzerCompareFilters from 'components/analyzer-compare/filters';
import ApplyFilters from 'components/analyzer/apply-filters';

// styles
import './styles.scss';

class AnalyzerCompare extends PureComponent {
  static propTypes = { filtersCompare: PropTypes.object.isRequired }

  render() {
    const { filtersCompare } = this.props;
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
                <AnalyzerInputs />
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
