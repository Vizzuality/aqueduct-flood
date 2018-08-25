import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, CustomSelect, Button } from 'aqueduct-components';
import { Router } from 'routes';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// data
// import BASINS_OPTIONS from 'data/basins';
import COUNTRIES_OPTIONS from 'data/countries';
// import CITIES_OPTIONS from 'data/cities';

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
    const { filters } = this.props;
    const { location, locationCompare } = filters;

    const countryOptions = COUNTRIES_OPTIONS.map(_country => ({
      label: _country.label, value: _country.iso
    }));

    this.locationOptions = sortBy([...countryOptions, 'label']);

    this.stateOptions = ((COUNTRIES_OPTIONS.find(_country =>
      _country.iso === location) || {}).state || [])
      .map(state => ({ label: state.label, value: state.key }));

    this.stateOptionsCompare = ((COUNTRIES_OPTIONS.find(_country =>
      _country.iso === locationCompare) || {}).state || [])
      .map(state => ({ label: state.label, value: state.key }));
  }

  componentWillReceiveProps(nextProps) {
    const { filters:nextFilters } = nextProps;
    const { filters } = this.props;

    if(!isEqual(filters.location, nextFilters.location)) {
      this.stateOptions = ((COUNTRIES_OPTIONS.find(_country =>
        _country.iso === nextFilters.location) || {}).state || [])
        .map(state => ({ label: state.label, value: state.key }));
    }

    if(!isEqual(filters.locationCompare, nextFilters.locationCompare)) {
      this.stateOptionsCompare = ((COUNTRIES_OPTIONS.find(_country =>
        _country.iso === nextFilters.locationCompare) || {}).state || [])
        .map(state => ({ label: state.label, value: state.key }));
    }
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
              {/* location – states */}
              <Field
                name="location-filter"
                label="Select a state"
                className="-bigger"
              >
                <CustomSelect
                  options={this.stateOptions}
                  placeholder="Select a state"
                  isDisabled={!this.stateOptions.length}
                  value={filters.state}
                  onChange={opt => setFilter({ state: opt && opt.value })}
                  isClearable
                />
              </Field>
            </div>
            <div className="col-md-6">
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
              {/* location – states */}
              <Field
                name="location-filter"
                label="Select a state"
                className="-bigger"
              >
                <CustomSelect
                  options={this.stateOptionsCompare}
                  placeholder="Select a state"
                  isDisabled={!this.stateOptionsCompare.length}
                  value={filters.stateCompare}
                  onChange={opt => setCompareFilter({ state: opt && opt.value })}
                  isClearable
                />
              </Field>
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
