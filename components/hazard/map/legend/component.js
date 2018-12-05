import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Timeline } from 'aqueduct-components';

// styles
import './styles.scss';

// constants
import { RANGE_LABELS } from './constants';

class HazardLegend extends PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onChangePeriod: PropTypes.func.isRequired
  }

  onChangePeriod = ({ value }) => {
    const { onChangePeriod } = this.props;

    onChangePeriod(value);
  }

  render() {
    const { options } = this.props;

    return (
      <div className="c-hazard-map-legend">
        <div className="timeline-container">
          <Field
            name="hazard-return-period"
            label="Flood magnitude (return period in years)"
            theme="dark"
            customClass="field-timeline"
            className="-bigger"
          >
            <Timeline
              items={options}
              onChange={this.onChangePeriod}
              theme="dark"
            />
          </Field>

          <Field
            name="hazard-return-period"
            label="Inundation depth (decimeters)"
            theme="dark"
            className="-bigger"
          >
            <div className="range-container">
              <div className="hazard-range" />
              <div className="hazard-labels">
                {RANGE_LABELS.map((_label) => (
                  <span key={_label}>
                    {_label}
                  </span>
                ))}
              </div>
            </div>
          </Field>
        </div>
      </div>
    );
  }
}

export default HazardLegend;
