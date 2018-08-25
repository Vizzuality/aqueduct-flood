import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { Field, CustomSelect } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// data
// import BASINS_OPTIONS from 'data/basins';
import COUNTRIES_OPTIONS from 'data/countries';
// import CITIES_OPTIONS from 'data/cities';

// styles
import './styles.scss';

class AnalyzerFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      location: PropTypes.string,
      scenario: PropTypes.string,
      locationCompare: PropTypes.string
    }).isRequired,
    setFilter: PropTypes.func.isRequired,
    setCompareFilter: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { filters } = this.props;
    const { location } = filters;

    const countryOptions = COUNTRIES_OPTIONS.map(_country => ({
      label: _country.name, value: _country.uniquename
    }));

    this.locationOptions = sortBy([...countryOptions, 'label']);
    this.stateOptions = sortBy(((COUNTRIES_OPTIONS.find(_country =>
      _country.uniquename === location) || {}).state || [])
      .map(state => ({ label: state.name, value: state.uniquename })), 'label');
  }

  componentWillReceiveProps(nextProps) {
    const { filters:nextFilters } = nextProps;
    const { filters } = this.props;

    if(!isEqual(filters.location, nextFilters.location)) {
      this.stateOptions = sortBy(((COUNTRIES_OPTIONS.find(_country =>
        _country.uniquename === nextFilters.location) || {}).state || [])
        .map(state => ({ label: state.name, value: state.uniquename })), 'label');
    }
  }

  render() {
    const {
      filters,
      setFilter,
      setCompareFilter
    } = this.props;

    return (
      <div className="c-analyzer-filters">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-6">
              {/* location */}
              <Field
                name="location-filter"
                label="Select a location"
                className="-bigger"
              >
                <CustomSelect
                  options={this.locationOptions}
                  placeholder="Select a location"
                  value={filters.location}
                  onChange={opt => setFilter({ geogunit_unique_name: opt && opt.value })}
                />
              </Field>
              {/* future scenearios */}
              <Field
                name="future-scenario-filter"
                label="Select a future scenario"
                className="-bigger"
              >
                <CustomSelect
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a future scenario"
                  value={filters.scenario}
                  onChange={opt => setFilter({ scenario: opt && opt.value })}
                />
              </Field>
            </div>
            <div className="col-md-6">
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
              {/* location compare */}
              <Field
                name="location-compare-filter"
                label="Compare with"
                className="-bigger"
              >
                <CustomSelect
                  options={this.locationOptions}
                  placeholder="Compare with"
                  isDisabled={!filters.location}
                  value={filters.compareLocation}
                  onChange={(opt) => {
                    setCompareFilter({ geogunit_unique_name: opt && opt.value });
                    if (opt) Router.push('/analyzer-compare');
                  }}
                  isClearable
                />
              </Field>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-xs-12 col-md-6">
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default AnalyzerFilters;
