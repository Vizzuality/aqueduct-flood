import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Slider } from 'aqueduct-components';

// constants
import {
  RETURN_PERIOD_MARKS,
  PROBABILITY_CONVERSION
} from './constants';

// styles
import './styles.scss';
import { RETURN_PERIOD_OPTIONS } from 'components/hazard/map/legend/constants';

class HazardLegend extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  }

  static defaultProps = {
    label: null,
    disabled: false
  }

  render() {
    const {
      label,
      value,
      disabled
    } = this.props;

    return (
      <div className="c-hazard-legend">
        <div className="filter">
          <Field
            name="existing-protection-level"
            theme="dark"
            {...label && { label }}
            className="-higher-margin-top -bolder"
          >
            <Slider
              disabled={disabled}
              min={2}
              max={1000}
              theme="dark"
              step={null}
              value={value}
              formatValue={v => PROBABILITY_CONVERSION[v]}
              marks={RETURN_PERIOD_MARKS}
              colorful
              railStyle={{
                background: 'linear-gradient(to right, #0A125E 0%, #003E88 12.5%, #0066A4 25%, #008EB3 37.5%, #00B4BA 50%, #6BD9BF 62.5%, #88F6DB, 75%, #91FEE3 100%)'
              }}
              defaultValue={value}
            />
          </Field>
        </div>
      </div>
    );
  }
}

export default HazardLegend;
