import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';

// components
import RiskInputs from 'components/risk/risk-inputs';
import RiskCompareInputs from 'components/compare/risk/inputs';
import RiskCompareOutputs from 'components/compare/risk/outputs';
import RiskCompareFilters from 'components/compare/risk/filters';

// styles
import './styles.scss';

class RiskCompare extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    loadingDefaults: PropTypes.bool.isRequired,
    loadingCompareDefaults: PropTypes.bool.isRequired,
  }

  render() {
    const {
      loadingDefaults,
      loadingCompareDefaults,
      filters,
      filtersCompare
    } = this.props;
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
                {loadingDefaults && (
                  <div className="spinner-container">
                    <Spinner className="-transparent" />
                  </div>)}
                {(location && !loadingDefaults) && <RiskInputs />}
              </div>
              <div className="col-md-6">
                {loadingCompareDefaults && (
                  <div className="spinner-container">
                    <Spinner className="-transparent" />
                  </div>)}
                {(locationCompare && !loadingCompareDefaults) && <RiskCompareInputs />}
              </div>
            </div>
          </div>
        </div>

        <div className="risk-compare-outputs">
          <RiskCompareOutputs />
        </div>
      </div>)
  }
}

export default RiskCompare;
