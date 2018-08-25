import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, CustomSelect, Button } from 'aqueduct-components';
import { Router } from 'routes';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// data
import BASINS_OPTIONS from 'data/basins';
import COUNTRIES_OPTIONS from 'data/countries';
import CITIES_OPTIONS from 'data/cities';

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

  componentWillMount() {
    this.locationOptions = [...BASINS_OPTIONS, ...CITIES_OPTIONS];
  }

  onClearCompareFilters = () => {
    const { clearCompareFilters } = this.props;

    clearCompareFilters();

    Router.push('/');
  }

  render() {
    const {
      filters,
      setFilter,
      setCompareFilter
    } = this.props;

    return (
      <div className="c-analyzer-compare-filters">
        <div className="wrapper">
          <div className="row">
            {/* location filters */}
            <div className="col-md-6">
              <Field
                name="location-filter"
                label="Select a location"
                className="-bigger"
              >
                <CustomSelect
                  options={this.locationOptions}
                  placeholder="Select a location"
                  value={filters.location}
                  onChange={opt => { setFilter({ geogunit_unique_name: opt && opt.value })}}
                  isClearable
                />
              </Field>
            </div>
            <div className="col-md-6">
              {/* scenario filters */}
              <div className="clear-comparison-section">
                <Field
                  name="location-compare-filter"
                  label="Select a location"
                  className="-bigger"
                >
                  <CustomSelect
                    options={this.locationOptions}
                    placeholder="Select a location"
                    isDisabled={!filters.location}
                    value={filters.locationCompare}
                    onChange={opt => { setCompareFilter({ geogunit_unique_name: opt && opt.value })}}
                  />
                </Field>
                <Button
                  onClick={this.onClearCompareFilters}
                  theme="blue"
                  className="-regular -bg-white"
                >
                  Clear comparison
                </Button>
              </div>
            </div>
          </div>
          {/* compare filters */}
          <div className="row">
            <div className="col-md-6">
              <Field
                name="scenario-filter"
                label="Select a Future Scenario"
                className="-bigger"
              >
                <CustomSelect
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a scenario"
                  value={filters.scenario}
                  onChange={opt => { setFilter({ scenario: opt && opt.value })}}
                />
              </Field>
            </div>
            <div className="col-md-6">
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
                  onChange={opt => { setCompareFilter({ scenario: opt && opt.value })}}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerCompareFilters;
