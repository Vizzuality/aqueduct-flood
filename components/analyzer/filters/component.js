import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { Field, CustomSelect } from 'aqueduct-components';
import debounce from 'lodash/debounce';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

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
    setCommonFilter: PropTypes.func.isRequired,
    setCostFilter: PropTypes.func.isRequired,
    setCommonCompareFilter: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    getCompareLocations: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setInputCompare: PropTypes.func.isRequired,
    resetWidgets: PropTypes.func.isRequired
  }

  onSearch = debounce((value) => {
    const { getLocations } = this.props;

    if (value && value.length > 2 ) getLocations(value);
  }, 150)

  onChangeLocation = (opt) => {
    const {
      setCommonFilter,
      setCostFilter,
      filters,
      setInput,
      getCountryDefaults,
      resetWidgets
    } = this.props;
    const { location } = filters;

    if ((opt && opt.value) === location) return;

    setInput({ loading: true })
    setCommonFilter({ geogunit_unique_name: opt && opt.value });

    resetWidgets('cba');

    getCountryDefaults(setCostFilter)
      .then(() => { setInput({ loading: false }) })
  }

  onSearchCompare = debounce((value) => {
    const { getCompareLocations } = this.props;

    if (value && value.length > 2 ) getCompareLocations(value);
  }, 150)

  onChangeLocationCompare = (opt) => {
    const { setInputCompare, setCommonCompareFilter } = this.props;

    setInputCompare({ loading: true })
    setCommonCompareFilter({ geogunit_unique_name: opt && opt.value });

    if (opt) Router.pushRoute('compare')
  }

  render() {
    const {
      filters,
      locations,
      locationsCompare,
      setCommonFilter
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
                  instanceId="location"
                  grouped
                  options={locations}
                  placeholder="Select a location"
                  value={filters.location}
                  onInputChange={this.onSearch}
                  onChange={this.onChangeLocation}
                />
              </Field>
              {/* future scenarios */}
              <Field
                name="future-scenario-filter"
                label="Select a future scenario"
                className="-bigger"
              >
                <CustomSelect
                  instanceId="scenario"
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a future scenario"
                  value={filters.scenario}
                  onChange={opt => setCommonFilter({ scenario: opt && opt.value })}
                />
              </Field>
            </div>
            <div className="col-md-6">
              {/* location compare */}
              <Field
                name="location-compare-filter"
                label="Compare with"
                className="-bigger"
              >
                <CustomSelect
                  instanceId="location-compare"
                  grouped
                  options={locationsCompare}
                  placeholder="Compare with..."
                  isDisabled={!filters.location}
                  value={filters.compareLocation}
                  onInputChange={this.onSearchCompare}
                  onChange={this.onChangeLocationCompare}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerFilters;
