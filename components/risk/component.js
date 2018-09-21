import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import RiskFilters from 'components/risk/filters';
import RiskInputs from 'components/risk/risk-inputs';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class Risk extends PureComponent {
  static propTypes = { input: PropTypes.shape({ loading: PropTypes.bool.isRequired }).isRequired }

  render() {
    const {
      input,
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
          <div className="wrapper">
            <div className="row">
              <div className="col-xs-12">
                <RiskInputs />
              </div>
            </div>
          </div>
        </div>
        <ApplyFilters />
      </div>
    );
  }
}

export default Risk;
