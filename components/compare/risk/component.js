import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
// import InputsRiskCompare from 'components/compare/risk/inputs';
import RiskCompareOutputs from 'components/compare/risk/outputs';
import RiskCompareFilters from 'components/compare/risk/filters';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class RiskCompare extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    clearFilters: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    const { clearFilters, clearCompareFilters }= this.props;

    clearFilters();
    clearCompareFilters();
  }

  render() {
    const { filters, filtersCompare } = this.props;
    const { geogunit_unique_name: location } = filters;
    const { geogunit_unique_name: locationCompare } = filtersCompare;

    return (
      <div className="c-risk-compare">
        <div className="l-filters">
          <RiskCompareFilters />
        </div>

        <div className="risk-compare-inputs">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-6">
                {/* <AnalyzerInputs /> */}
              </div>
              <div className="col-md-6">
                {/* {locationCompare && <InputsRiskCompare />} */}
              </div>
            </div>
          </div>
        </div>

        <div className="risk-compare-outputs">
          {location && <RiskCompareOutputs />}
        </div>

        <ApplyFilters />
      </div>)
  }
}

export default RiskCompare;
