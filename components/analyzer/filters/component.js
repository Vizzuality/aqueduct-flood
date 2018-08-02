import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, CustomSelect } from 'aqueduct-components';

// constants
import { SCENARIOS_OPTIONS } from './constants';

// styles
import './styles.scss';

class AnalyzerFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onChangeFilter: PropTypes.func.isRequired
  }

  render() {
    const { filters, onChangeFilter } = this.props;

    return (
      <div className="c-analyzer-filters">
        <div className="filter-row">
          {/* location */}
          <Field
            name="location-filter"
            label="Select a location"
            className="-bigger"
          >
            <CustomSelect
              options={SCENARIOS_OPTIONS}
              placeholder="Select a location"
              defaultValue={SCENARIOS_OPTIONS.find(opt => opt.value === filters.location)}
              onChange={({ value }) => onChangeFilter({ location: value })}
            />
          </Field>

          {/* location compare */}
          <Field
            name="location-compare-filter"
            label="Compare with"
            className="-bigger"
          >
            <CustomSelect
              options={SCENARIOS_OPTIONS}
              placeholder="Compare with"
              onChange={option => console.log(option)}
            />
          </Field>
        </div>
        <div className="filter-row">
          {/* future scenearios */}
          <Field
            name="future-scenario-filter"
            label="Select a future scenario"
            className="-bigger"
          >
            <CustomSelect
              options={SCENARIOS_OPTIONS}
              placeholder="Select a future scenario"
              defaultValue={SCENARIOS_OPTIONS.find(opt => opt.value === filters.scenario)}
              onChange={({ value }) => onChangeFilter({ scenario: value })}
            />
          </Field>
        </div>
      </div>
    );
  }
}

export default AnalyzerFilters;
