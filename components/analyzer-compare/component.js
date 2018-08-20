import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import AnalyzerInputs from 'components/analyzer-inputs';
import AnalyzerCompareOutputs from 'components/analyzer-compare/outputs';
import AnalyzerCompareFilters from './filters';

// styles
import './styles.scss';

class AnalyzerCompare extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    setCompareFilter: PropTypes.func.isRequired
  }

  render() {
    const { filters, filtersCompare, setFilter, setCompareFilter } = this.props;

    return (
      <div className="c-analyzer-compare">
        <div className="l-filters">
          <AnalyzerCompareFilters />
        </div>

        <div className="analyzer-compare-inputs">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-6">
                <AnalyzerInputs onChangeFilter={setFilter} filters={filters} />
              </div>
              <div className="col-md-6">
                <AnalyzerInputs onChangeFilter={setCompareFilter} filters={filtersCompare} />
              </div>
            </div>
          </div>
        </div>

        <div className="analyzer-compare-outputs">
          <AnalyzerCompareOutputs />
        </div>
      </div>
    );
  }
}

export default AnalyzerCompare;
