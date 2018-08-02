import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, CustomSelect, Button } from 'aqueduct-components';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// styles
import './styles.scss';

class AnalyzerCompareFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      location: PropTypes.string,
      scenario: PropTypes.string,
      locationCompare: PropTypes.string,
      scenarioCompare: PropTypes.string
    }).isRequired,
    setFilter: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired,
    setCompareFilter: PropTypes.func.isRequired,
  }

  render() {
    const {
      filters,
      setFilter,
      clearCompareFilters,
      setCompareFilter
    } = this.props;

    return (
      <div className="c-analyzer-compare-filters">
        <div className="wrapper">
          <div className="row">
            {/* filters */}
            <div className="col-md-6">
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
                    value={filters.location}
                    defaultValue={filters.location}
                    onChange={opt => { setFilter({ location: opt && opt.value })}}
                    isClearable
                  />
                </Field>
              </div>
              <div className="filter-row">
                {/* scenario */}
                <Field
                  name="scenario-filter"
                  label="Select a Future Scenario"
                  className="-bigger"
                >
                  <CustomSelect
                    options={SCENARIOS_OPTIONS}
                    placeholder="Select a scenario"
                    value={filters.scenario}
                    defaultValue={filters.scenario}
                    onChange={opt => { setFilter({ scenario: opt && opt.value })}}
                  />
                </Field>
              </div>
            </div>
            {/* compare filters */}
            <div className="col-md-6">
              <div className="filter-row -align-start">
                {/* location */}
                <Field
                  name="location-compare-filter"
                  label="Select a location"
                  className="-bigger"
                >
                  <CustomSelect
                    options={SCENARIOS_OPTIONS}
                    placeholder="Select a location"
                    isDisabled={!filters.location}
                    value={filters.locationCompare}
                    defaultValue={filters.locationCompare}
                    onChange={opt => { setCompareFilter({ location: opt && opt.value })}}
                  />
                </Field>
                <Button
                  onClick={() => clearCompareFilters()}
                  theme="blue"
                  className="-regular -bg-white"
                >
                  Clear comparison
                </Button>
              </div>
              <div className="filter-row">
                {/* scenario */}
                <Field
                  name="scenario-compare-filter"
                  label="Select a Future Scenario"
                  className="-bigger"
                >
                  <CustomSelect
                    options={SCENARIOS_OPTIONS}
                    placeholder="Select a scenario"
                    isDisabled={!filters.location}
                    value={filters.scenarioCompare}
                    defaultValue={filters.scenarioCompare}
                    onChange={opt => { setCompareFilter({ scenario: opt && opt.value })}}
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerCompareFilters;
