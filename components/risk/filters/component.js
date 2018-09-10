import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { Field, CustomSelect, Checkbox } from 'aqueduct-components';
import debounce from 'lodash/debounce';

// constants
import {
  FLOOD_TYPE_OPTIONS,
  EXPOSURE_OPTIONS
} from 'constants/risk';

// styles
import './styles.scss';

class AnalyzerFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      location: PropTypes.string,
      scenario: PropTypes.string,
      locationCompare: PropTypes.string
    }).isRequired,
    locations: PropTypes.array.isRequired,
    locationsCompare: PropTypes.array.isRequired,
    setFilter: PropTypes.func.isRequired,
    setCompareFilter: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    getCompareLocations: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setInputCompare: PropTypes.func.isRequired
  }

  onSearch = debounce((value) => {
    const { getLocations } = this.props;

    if (value && value.length > 2 ) getLocations(value);
  }, 150)

  onChangeLocation = (opt) => {
    const { setFilter, filters, setInput, getCountryDefaults } = this.props;
    const { location } = filters;

    if ((opt && opt.value) === location) return;

    setInput({ loading: true })
    setFilter({ geogunit_unique_name: opt && opt.value });

    getCountryDefaults()
      .then(() => { setInput({ loading: false }) })
  }

  onSearchCompare = debounce((value) => {
    const { getCompareLocations } = this.props;

    if (value && value.length > 2 ) getCompareLocations(value);
  }, 150)

  onChangeLocationCompare = (opt) => {
    const { setInputCompare, setCompareFilter } = this.props;

    setInputCompare({ loading: true })
    setCompareFilter({ geogunit_unique_name: opt && opt.value });

    if (opt) Router.push('/analyzer-compare');
  }

  render() {
    const {
      filters,
      locations,
      locationsCompare,
      setFilter
    } = this.props;
    const isCoastal = filters.flood === 'Coastal';

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
                  grouped
                  options={locations}
                  placeholder="Select a location"
                  value={filters.location}
                  onInputChange={this.onSearch}
                  onChange={this.onChangeLocation}
                />
              </Field>
              {/* future scenarios */}
              {/* <Field
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
              </Field> */}
            </div>
            <div className="col-md-6">
              {/* location compare */}
              <Field
                name="location-compare-filter"
                label="Compare with"
                className="-bigger"
              >
                <CustomSelect
                  grouped
                  options={locationsCompare}
                  placeholder="Compare with..."
                  isDisabled={!filters.location}
                  value={filters.compareLocation}
                  onChange={this.onChangeLocationCompare}
                />
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {/* flood type */}
              <Field
                name="flood-type-filter"
                label="Flood Type"
                className="-bigger"
              >
                <CustomSelect
                  options={FLOOD_TYPE_OPTIONS}
                  placeholder="Select a flood type..."
                  value={filters.flood}
                  onChange={opt => setFilter({ flood: opt && opt.value })}
                />
              </Field>
            </div>
            <div className="col-md-6">
              {/* exposure */}
              <Field
                name="risk-indicator-filter"
                label="Risk Indicator"
                className="-bigger"
              >
                <CustomSelect
                  options={EXPOSURE_OPTIONS}
                  placeholder="Select a risk indicator..."
                  value={filters.exposure}
                  onChange={opt => setFilter({ exposure: opt && opt.value })}
                />
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Checkbox
                label="Subsidence"
                name="sub_scenario"
                value="sub_scenario"
                theme="light"
                // disabled={!isCoastal}
                defaultChecked
                onChange={({ checked }) => setFilter({ sub_scenario: checked })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerFilters;
