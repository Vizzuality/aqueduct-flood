import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Slider } from 'aqueduct-components';

// constants
import { RETURN_PERIOD_MARKS } from './constants';

// styles
import './styles.scss';

class HazardLegend extends PureComponent {
  static propTypes = {
    hazardLegend: PropTypes.shape({
      returnPeriod: PropTypes.number.isRequired
    }).isRequired,
    setReturnPeriod: PropTypes.func.isRequired
  }

  onChangePeriod = (value) => {
    const { setReturnPeriod } = this.props;

    setReturnPeriod(value);
  }

  render() {
    const { hazardLegend } = this.props;
    const { returnPeriod } = hazardLegend;

    return (
      <div className="c-hazard-legend">
        <div className="filter">
          <Field
            name="existing-protection-level"
            theme="dark"
            label="Existing Protection Level (Return Period)"
            className="-higher-margin-top -bolder"
          >
            <Slider
              min={2}
              max={1000}
              theme="dark"
              step={null}
              value={returnPeriod}
              marks={RETURN_PERIOD_MARKS}
              colorful
              railStyle={{
                background: 'linear-gradient(to right, #0A125E 0%, #003E88 12.5%, #0066A4 25%, #008EB3 37.5%, #00B4BA 50%, #6BD9BF 62.5%, #88F6DB, 75%, #91FEE3 100%)'
              }}
              onChange={this.onChangePeriod}
              defaultValue={returnPeriod}
              onAfterChange={this.onChangePeriod}
            />
          </Field>
        </div>
      </div>
    );
  }
}

export default HazardLegend;
