import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Timeline } from 'aqueduct-components';

// styles
import './styles.scss';

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
            label="Existing Protection Level (Return Period)"
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
        </div>
      </div>
    );
  }
}

export default HazardLegend;
