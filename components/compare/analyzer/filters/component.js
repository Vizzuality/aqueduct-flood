import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, CustomSelect, Button } from 'aqueduct-components';
import { Router } from 'routes';
import debounce from 'lodash/debounce';

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
    locations: PropTypes.array.isRequired,
    locationsCompare: PropTypes.array.isRequired,
    setCommonFilter: PropTypes.func.isRequired,
    setCostFilter: PropTypes.func.isRequired,
    setCommonCompareFilter: PropTypes.func.isRequired,
    setCostCompareFilter: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    getCompareLocations: PropTypes.func.isRequired,
    setCompareLocations: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setInputCompare: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    getCompareCountryDefaults: PropTypes.func.isRequired,
    resetWidgets: PropTypes.func.isRequired,
    resetWidgetsCompare: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { filters, getCompareCountryDefaults, setCostCompareFilter, setInputCompare } = this.props;
    const { locationCompare } = filters;

    if (locationCompare) {
      getCompareCountryDefaults(setCostCompareFilter)
        .then(() => { setInputCompare({ loading: false }) })
    }
  }

  onClearCompareFilters = () => {
    const { clearCompareFilters, setCompareLocations } = this.props;

    clearCompareFilters();
    setCompareLocations([]);

    Router.push('/');
  }

  onChangeLocation = (opt) => {
    const {
      filters,
      setInput,
      setCommonFilter,
      setCostFilter,
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

  onChangeLocationCompare = (opt) => {
    const {
      setCommonCompareFilter,
      setCostCompareFilter,
      filters,
      setInputCompare,
      getCompareCountryDefaults,
      resetWidgetsCompare
    } = this.props;
    const { locationCompare } = filters;

    if ((opt && opt.value) === locationCompare) return;

    setInputCompare({ loading: true })
    setCommonCompareFilter({ geogunit_unique_name: opt && opt.value });

    resetWidgetsCompare('cba');

    getCompareCountryDefaults(setCostCompareFilter)
      .then(() => { setInputCompare({ loading: false }) })
  }

  onSearch = debounce((value) => {
    const { getLocations } = this.props;

    if (value && value.length > 2 ) getLocations(value);
  }, 150)

  onSearchCompare = debounce((value) => {
    const { getCompareLocations } = this.props;

    if (value && value.length > 2 ) getCompareLocations(value);
  }, 150)

  render() {
    const {
      filters,
      locations,
      locationsCompare,
      setCommonCompareFilter,
      setCommonFilter
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
                  instanceId="location"
                  grouped
                  options={locations}
                  placeholder="Select a location"
                  value={filters.location}
                  onInputChange={this.onSearch}
                  onChange={this.onChangeLocation}
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
                    instanceId="location-compare"
                    grouped
                    options={locationsCompare}
                    placeholder="Compare with..."
                    isDisabled={!filters.location}
                    value={filters.locationCompare}
                    onInputChange={this.onSearchCompare}
                    onChange={this.onChangeLocationCompare}
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
                  instanceId="scenario"
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a scenario"
                  value={filters.scenario}
                  onChange={opt => { setCommonFilter({ scenario: opt && opt.value })}}
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
                  instanceId="scenario-compare"
                  options={SCENARIOS_OPTIONS}
                  placeholder="Select a scenario"
                  isDisabled={!filters.locationCompare}
                  value={filters.scenarioCompare}
                  onChange={opt => { setCommonCompareFilter({ scenario: opt && opt.value })}}
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
