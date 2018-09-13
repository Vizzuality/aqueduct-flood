import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import RiskFilters from 'components/risk/filters';
// import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import RiskOutputs from 'components/risk/outputs';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class Risk extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}).isRequired,
    input: PropTypes.shape({ loading: PropTypes.bool.isRequired }).isRequired,
    setRiskFilter: PropTypes.func.isRequired
  }

  render() {
    const {
      filters,
      input,
      setRiskFilter
    } = this.props;
    const { loading } = input;

    const loadingStyles = {
      ...loading && { overflowY: 'hidden' }
    };

    return (
      <div className="c-risk">
        <div className="l-filters">
          <RiskFilters />
        </div>

        <div className="l-risk-inputs" style={loadingStyles}>
          {/* <div className="wrapper">
            <div className="row">
              <div className="col-xs-12">
                <AnalyzerInputs onChangeFilter={setRiskFilter} filters={filters} />
              </div>
            </div>
          </div> */}
        </div>
        <RiskOutputs />
        <ApplyFilters />
      </div>
    );
  }
}

export default Risk;
