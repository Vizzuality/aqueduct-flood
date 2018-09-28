import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Timeline, CustomSelect, Checkbox } from 'aqueduct-components';

// constants
import {
  YEAR_OPTIONS,
  RIVERINE_PROJECTION_MODEL_OPTIONS,
  COASTAL_PROJECTION_MODEL_OPTIONS
} from 'constants/hazard';
import { FLOOD_TYPE_OPTIONS } from 'constants/risk';
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// styles
import './styles.scss';

class HazardFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    setHazardFilter: PropTypes.func.isRequired
  }

  onChangeYear = ({ value }) => {
    const { setHazardFilter } = this.props;

    setHazardFilter({
      year: value,
      ...value === 2010 && { scenario: 'business as usual' }
    });
  }

  onChangeFlood = (opt) => {
    const { setHazardFilter } = this.props;
    const isRiverine = opt && opt.value === 'riverine';

    const projectionModelOptions = isRiverine ?
      RIVERINE_PROJECTION_MODEL_OPTIONS : COASTAL_PROJECTION_MODEL_OPTIONS;

    setHazardFilter({
      flood: opt && opt.value,
      ...isRiverine && { sub_scenario: false },
      projection_model: projectionModelOptions.find(_opt => _opt.default).value
    });
  }

  render() {
    const {
      filters,
      setHazardFilter
    } = this.props;
    const isCoastal = filters.flood === 'coastal';
    const isBaseline = filters.year === 2010;
    const modelProjectionOptions = isCoastal ?
      COASTAL_PROJECTION_MODEL_OPTIONS : RIVERINE_PROJECTION_MODEL_OPTIONS;

    return (
      <div className="c-hazard-filters">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs-12">
              {/* year */}
              <Field
                name="hazard-year"
                label="Year"
                className="-bigger"
                customClass="field-timeline"
              >
                <Timeline
                  items={YEAR_OPTIONS}
                  onChange={this.onChangeYear}
                />
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              {/* flood */}
              <Field
                name="hazard-flood"
                label="Flood type"
                className="-bigger"
              >
                <CustomSelect
                  instanceId="hazard-flood"
                  options={FLOOD_TYPE_OPTIONS}
                  placeholder="Select a flood type..."
                  value={filters.flood}
                  onChange={this.onChangeFlood}
                />
              </Field>
            </div>
            <div className="col-xs-12 col-md-4">
              <Field
                name="hazard-scenario"
                label="Future Scenario"
                disabled={isBaseline}
                className="-bigger"
              >
                <CustomSelect
                  instanceId="hazard-scenario"
                  isDisabled={isBaseline}
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a scenario"
                  value={filters.scenario}
                  onChange={opt => setHazardFilter({ scenario: opt && opt.value })}
                />
              </Field>
            </div>
            <div className="col-xs-12 col-md-4">
              <Field
                name="hazard-projection-model"
                label="Projection Model"
                className="-bigger"
              >
                <CustomSelect
                  instanceId="hazard-projection-model"
                  options={modelProjectionOptions}
                  placeholder="Select a projection model"
                  value={filters.projection_model}
                  onChange={opt => setHazardFilter({ projection_model: opt && opt.value })}
                />
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Checkbox
                label="Subsidence"
                name="hazard-sub_scenario"
                value="sub_scenario"
                theme="light"
                disabled={!isCoastal}
                defaultChecked={filters.sub_scenario}
                onChange={({ checked }) => setHazardFilter({ sub_scenario: checked })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HazardFilters;
