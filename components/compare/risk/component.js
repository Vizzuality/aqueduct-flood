import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import RiskInputs from 'components/risk/risk-inputs';
import RiskCompareInputs from 'components/compare/risk/inputs';
import RiskCompareOutputs from 'components/compare/risk/outputs';
import RiskCompareFilters from 'components/compare/risk/filters';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class RiskCompare extends PureComponent {
  static propTypes = {
    advancedSettings: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    setWidgetsCompare: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { setWidgetsCompare, advancedSettings } = this.props;

    setWidgetsCompare({
      nextTab: 'risk',
      advancedSettings
    });
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
                {location && <RiskInputs />}
              </div>
              <div className="col-md-6">
                {locationCompare && <RiskCompareInputs />}
              </div>
            </div>
          </div>
        </div>

        <div className="risk-compare-outputs">
          <RiskCompareOutputs />
        </div>

        <ApplyFilters />
      </div>)
  }
}

export default RiskCompare;
