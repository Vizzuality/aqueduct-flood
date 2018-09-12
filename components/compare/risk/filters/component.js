import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { Field, CustomSelect, Checkbox, Button } from 'aqueduct-components';
import debounce from 'lodash/debounce';

// constants
import {
  FLOOD_TYPE_OPTIONS,
  EXPOSURE_OPTIONS
} from 'constants/risk';

// styles
import './styles.scss';

class RiskFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      location: PropTypes.string,
      scenario: PropTypes.string,
      locationCompare: PropTypes.string
    }).isRequired,
    locations: PropTypes.array.isRequired,
    locationsCompare: PropTypes.array.isRequired,
    scenarios: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    })).isRequired,
    scenariosCompare: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    })).isRequired,
    filtersCompare: PropTypes.object.isRequired,
    setCommonFilter: PropTypes.func.isRequired,
    setRiskFilter: PropTypes.func.isRequired,
    setRiskCompareFilter: PropTypes.func.isRequired,
    setCommonCompareFilter: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    setCompareLocations: PropTypes.func.isRequired,
    getCompareLocations: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    getCompareCountryDefaults: PropTypes.func.isRequired,
    clearCompareFilters: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setInputCompare: PropTypes.func.isRequired
  }

  onSearch = debounce((value) => {
    const { getLocations } = this.props;

    if (value && value.length > 2 ) getLocations(value);
  }, 150)

  onChangeLocation = (opt) => {
    const { setCommonFilter, filters, setInput, getCountryDefaults } = this.props;
    const { location } = filters;

    if ((opt && opt.value) === location) return;

    setInput({ loading: true })
    setCommonFilter({ geogunit_unique_name: opt && opt.value });

    getCountryDefaults(setCommonFilter)
      .then(() => { setInput({ loading: false }) })
  }

  onSearchCompare = debounce((value) => {
    const { getCompareLocations } = this.props;

    if (value && value.length > 2 ) getCompareLocations(value);
  }, 150)

  onChangeLocationCompare = (opt) => {
    const {
      filtersCompare,
      setInputCompare,
      setCommonCompareFilter,
      setRiskCompareFilter,
      getCompareCountryDefaults
    } = this.props;
    const { geogunit_unique_name: locationCompare } = filtersCompare;

    if ((opt && opt.value) === locationCompare) return;

    setInputCompare({ loading: true })
    setCommonCompareFilter({ geogunit_unique_name: opt && opt.value });

    getCompareCountryDefaults(setRiskCompareFilter)
      .then(() => { setInputCompare({ loading: false }) })
  }

  onCheckAdvancedSettings = ({ checked }) => {
    const { setRiskFilter, scenarios } = this.props;

    setRiskFilter({
      advanced_settings: checked,
      ...!checked && { scenario: scenarios[0].value }
    });
  }

  onCheckAdvancedSettingsCompare = ({ checked }) => {
    const { setRiskCompareFilter, scenariosCompare } = this.props;

    setRiskCompareFilter({
      advanced_settings: checked,
      ...!checked && { scenario: scenariosCompare[0].value }
    });
  }

  onClearCompareFilters = () => {
    const { clearCompareFilters, setCompareLocations } = this.props;

    clearCompareFilters();
    setCompareLocations([]);

    Router.push('/');
  }

  render() {
    const {
      filters,
      filtersCompare,
      locations,
      locationsCompare,
      scenarios,
      scenariosCompare,
      setRiskFilter,
      setRiskCompareFilter
    } = this.props;
    const isCoastal = filters.flood === 'Coastal';
    const isCoastalCompare = filtersCompare.flood === 'Coastal';

    return (
      <div className="c-risk-filters">
        <div className="wrapper">
          {/* advanced settings */}
          <div className="row">
            <div className="col-md-6">
              <Checkbox
                label="Show Advanced Settings"
                name="advanced_settings"
                value="advanced_settings"
                theme="light"
                defaultChecked={filters.advanced_settings}
                onChange={this.onCheckAdvancedSettings}
              />
            </div>
            <div className="col-md-6">
              <div className="clear-comparison-section">
                <Checkbox
                  label="Show Advanced Settings"
                  name="advanced_settings_compare"
                  value="advanced_settings_compare"
                  theme="light"
                  defaultChecked={filtersCompare.advanced_settings}
                  onChange={this.onCheckAdvancedSettingsCompare}
                />
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
          {/* locations */}
          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <Field
                name="location-compare-filter"
                label="Select a location"
                className="-bigger"
              >
                <CustomSelect
                  grouped
                  options={locationsCompare}
                  placeholder="Compare with..."
                  isDisabled={!filters.location}
                  value={filtersCompare.geogunit_unique_name}
                  onInputChange={this.onSearchCompare}
                  onChange={this.onChangeLocationCompare}
                />
              </Field>
            </div>
          </div>
          {/* scenarios */}
          <div className="row">
            <div className="col-md-6">
              <Field
                name="future-scenario-filter"
                label="Select a future scenario"
                className="-bigger"
                disabled={!filters.advanced_settings}
              >
                <CustomSelect
                  options={scenarios}
                  isDisabled={!filters.advanced_settings}
                  placeholder="Select a future scenario"
                  value={filters.scenario}
                  onChange={opt => setRiskFilter({ scenario: opt && opt.value })}
                />
              </Field>
            </div>
            <div className="col-md-6">
              <Field
                name="future-scenario-filter-compare"
                label="Select a future scenario"
                className="-bigger"
                disabled={!filtersCompare.advanced_settings}
              >
                <CustomSelect
                  options={scenariosCompare}
                  isDisabled={!filtersCompare.advanced_settings}
                  placeholder="Select a future scenario"
                  value={filtersCompare.scenario}
                  onChange={opt => setRiskCompareFilter({ scenario: opt && opt.value })}
                />
              </Field>
            </div>
          </div>
          {/* flood type & risk indicator */}
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="flood-type-filter"
                    label="Flood Type"
                    className="-bigger"
                  >
                    <CustomSelect
                      options={FLOOD_TYPE_OPTIONS}
                      placeholder="Select a flood type..."
                      value={filters.flood}
                      onChange={opt => setRiskFilter({ flood: opt && opt.value })}
                    />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field
                    name="risk-indicator-filter"
                    label="Risk Indicator"
                    className="-bigger"
                  >
                    <CustomSelect
                      options={EXPOSURE_OPTIONS}
                      placeholder="Select a risk indicator..."
                      value={filters.exposure}
                      onChange={opt => setRiskFilter({ exposure: opt && opt.value })}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="flood-type-filter-compare"
                    label="Flood Type"
                    className="-bigger"
                  >
                    <CustomSelect
                      options={FLOOD_TYPE_OPTIONS}
                      placeholder="Select a flood type..."
                      value={filtersCompare.flood}
                      onChange={opt => setRiskCompareFilter({ flood: opt && opt.value })}
                    />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field
                    name="risk-indicator-filter-compare"
                    label="Risk Indicator"
                    className="-bigger"
                  >
                    <CustomSelect
                      options={EXPOSURE_OPTIONS}
                      placeholder="Select a risk indicator..."
                      value={filtersCompare.exposure}
                      onChange={opt => setRiskCompareFilter({ exposure: opt && opt.value })}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
          {/* subsidience */}
          <div className="row">
            <div className="col-md-6">
              <Checkbox
                label="Subsidence"
                name="sub_scenario"
                value="sub_scenario"
                theme="light"
                disabled={!isCoastal}
                defaultChecked={filters.sub_scenario}
                onChange={({ checked }) => setRiskFilter({ sub_scenario: checked })}
              />
            </div>
            <div className="col-md-6">
              <Checkbox
                label="Subsidence"
                name="sub_scenario-compare"
                value="sub_scenario-compare"
                theme="light"
                disabled={!isCoastalCompare}
                defaultChecked={filtersCompare.sub_scenario}
                onChange={({ checked }) => setRiskCompareFilter({ sub_scenario: checked })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RiskFilters;
