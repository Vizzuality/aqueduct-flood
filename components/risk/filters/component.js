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
    scenarios: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    })).isRequired,
    setCommonFilter: PropTypes.func.isRequired,
    setRiskFilter: PropTypes.func.isRequired,
    setCommonCompareFilter: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    getCompareLocations: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setInputCompare: PropTypes.func.isRequired,
    setWidgets: PropTypes.func.isRequired
  }

  state={ location: this.props.filters.location }

  componentWillMount() {
    const { filters, getCountryDefaults, setRiskFilter, setInput } = this.props;
    const {
      existingProt,
      location,
      flood,
      sub_scenario: subScenario
    } = filters;

    // calls defaults values if we don't have them available initially
    if (existingProt) return;

    setInput({ loading: true });

    const additionalParams = {
      flood,
      sub_scenario: subScenario
    };

    getCountryDefaults({ location, additionalParams })
      .then((defaults) => {
        setInput({ loading: false });
        setRiskFilter({ existing_prot: defaults.existing_prot })
      });
  }

  onSearch = debounce((value) => {
    const { getLocations } = this.props;

    if (value && value.length > 2 ) getLocations(value);
  }, 150)

  onChangeLocation = (opt) => {
    const { setCommonFilter, setRiskFilter, filters, setInput, getCountryDefaults } = this.props;
    const {
      location,
      flood,
      sub_scenario: subScenario
    } = filters;

    if ((opt && opt.value) === location) return;

    this.setState({ location: opt.value });

    setInput({ loading: true });

    const additionalParams = {
      flood,
      sub_scenario: subScenario
    };

    getCountryDefaults({ location: opt.value, additionalParams })
      .then((defaults) => {
        setInput({ loading: false });
        setCommonFilter({ geogunit_unique_name: opt.value });
        setRiskFilter({ existing_prot: defaults.existing_prot });
      });
  }

  onSearchCompare = debounce((value) => {
    const { getCompareLocations } = this.props;

    if (value && value.length > 2 ) getCompareLocations(value);
  }, 150)

  onChangeLocationCompare = (opt) => {
    const { setInputCompare, setCommonCompareFilter } = this.props;

    setInputCompare({ loading: true })
    setCommonCompareFilter({ geogunit_unique_name: opt && opt.value });

    if (opt) Router.push('/compare');
  }

  onCheckAdvancedSettings = ({ checked }) => {
    const {
      setRiskFilter,
      setWidgets,
      scenarios
    } = this.props;

    setWidgets({ nextTab: checked ? 'advanced_risk' : 'risk' });

    setRiskFilter({
      advanced_settings: checked,
      ...!checked && { scenario: scenarios[0].value }
    });
  }

  onChangeFlood = ({ value }) => {
    const {
      setInput,
      getCountryDefaults,
      setRiskFilter,
      filters: { location }
    } = this.props;

    setInput({ loading: true });

    const additionalParams = {
      flood: value,
      ...value === 'riverine' && { sub_scenario: false }
    };


    getCountryDefaults({ location, additionalParams })
      .then((defaults) => {
        setInput({ loading: false });
        setRiskFilter({
          existing_prot: defaults.existing_prot,
          flood: value,
          ...value === 'riverine' && { sub_scenario: false }
        });
      });
  }

  onCheckSubsidience = ({ checked }) => {
    const {
      setRiskFilter,
      setInput,
      getCountryDefaults,
      filters: { location, flood }
    } = this.props;

    setInput({ loading: true });

    const additionalParams = {
      sub_scenario: checked,
      flood
    };

    getCountryDefaults({ location, additionalParams })
      .then((defaults) => {
        setInput({ loading: false });
        setRiskFilter({
          existing_prot: defaults.existing_prot,
          sub_scenario: checked
        });
      });
  }

  render() {
    const {
      filters,
      locations,
      locationsCompare,
      scenarios,
      setRiskFilter
    } = this.props;
    const { location } = this.state;
    const isCoastal = filters.flood === 'coastal';
    const { advanced_settings: advancedSettings } = filters;

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
                  value={location}
                  onInputChange={this.onSearch}
                  onChange={this.onChangeLocation}
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
          {advancedSettings && (
            <div className="row">
              <div className="col-md-6">
                {/* future scenarios */}
                <Field
                  name="future-scenario-filter"
                  label="Select a future scenario"
                  className="-bigger"
                  disabled={!filters.advanced_settings}
                >
                  <CustomSelect
                    instanceId="scenario"
                    options={scenarios}
                    placeholder="Select a future scenario"
                    value={filters.scenario}
                    onChange={opt => setRiskFilter({ scenario: opt && opt.value })}
                  />
                </Field>
              </div>
            </div>)}
          <div className="row">
            <div className="col-md-6">
              {/* flood type */}
              <Field
                name="flood-type-filter"
                label="Flood Type"
                className="-bigger"
              >
                <CustomSelect
                  instanceId="flood"
                  options={FLOOD_TYPE_OPTIONS}
                  placeholder="Select a flood type..."
                  value={filters.flood}
                  onChange={this.onChangeFlood}
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
                  instanceId="indicator"
                  options={EXPOSURE_OPTIONS}
                  placeholder="Select a risk indicator..."
                  value={filters.exposure}
                  onChange={opt => setRiskFilter({ exposure: opt && opt.value })}
                />
              </Field>
            </div>
          </div>
          <div className="row between-md">
            <div className="col-md-6">
              {isCoastal && (
                <Checkbox
                  label="Subsidence"
                  name="sub_scenario"
                  theme="light"
                  checked={filters.sub_scenario}
                  onChange={this.onCheckSubsidience}
                />)}
            </div>
            <div className="col-md-6">
              <Checkbox
                label="Show Advanced Settings"
                name="advanced_settings"
                theme="light"
                checked={filters.advanced_settings}
                onChange={this.onCheckAdvancedSettings}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerFilters;
