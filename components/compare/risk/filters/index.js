import { connect } from 'react-redux';

// acctions
import { setCommonFilter, setRiskFilter } from 'modules/filters/actions';
import {
  setCommonCompareFilter,
  setRiskCompareFilter,
  clearCompareFilters
} from 'modules/filters-compare/actions';
import {
  getLocations,
  getCompareLocations,
  getCountryDefaults,
  getCompareCountryDefaults,
  setCompareLocations
} from 'modules/locations/actions';
import { setInput, setInputCompare } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { setWidgetsCompare } from 'modules/widgets-compare/actions';

// selectors
import {
  getFilteredLocations,
  getFilteredCompareLocations,
  getScenarios
} from 'components/risk/filters/selectors';

// component
import AnalyzerFilters from "./component";

export default connect(
  state => ({
    filters: {
      location: state.filters.common.geogunit_unique_name,
      scenario: state.filters.risk.scenario,
      advanced_settings: state.filters.risk.advanced_settings,
      flood: state.filters.risk.flood,
      exposure: state.filters.risk.exposure,
      sub_scenario: state.filters.risk.sub_scenario,
      compareLocation: state.filtersCompare.common.geogunit_unique_name,
      scenarioCompare: state.filtersCompare.risk.scenario
    },
    filtersCompare: {...state.filtersCompare.common, ...state.filtersCompare.risk },
    locations: getFilteredLocations(state),
    locationsCompare: getFilteredCompareLocations(state),
    scenarios: getScenarios(state)
  }),
  {
    setCommonFilter,
    setRiskFilter,
    setCommonCompareFilter,
    setRiskCompareFilter,
    clearCompareFilters,
    getLocations,
    getCompareLocations,
    getCountryDefaults,
    getCompareCountryDefaults,
    setCompareLocations,
    setInput,
    setInputCompare,
    setWidgets,
    setWidgetsCompare
  }
)(AnalyzerFilters);
