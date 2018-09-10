import { connect } from 'react-redux';

// acctions
import { setCommonFilter, setRiskFilter } from 'modules/filters/actions';
import { setCommonCompareFilter } from 'modules/filters-compare/actions';
import { getLocations, getCompareLocations, getCountryDefaults } from 'modules/locations/actions';
import { setInput, setInputCompare } from 'modules/app/actions';

// selectors
import { getFilteredLocations, getFilteredCompareLocations, getScenarios } from './selectors';

// component
import AnalyzerFilters from "./component";

export default connect(
  state => ({
    filters: {
      location : state.filters.common.geogunit_unique_name,
      scenario : state.filters.risk.scenario,
      advanced_settings : state.filters.risk.advanced_settings,
      flood : state.filters.risk.flood,
      exposure : state.filters.risk.exposure,
      compareLocation : state.filtersCompare.common.geogunit_unique_name
    },
    locations: getFilteredLocations(state),
    locationsCompare: getFilteredCompareLocations(state),
    scenarios: getScenarios(state)
  }),
  {
    setCommonFilter,
    setRiskFilter,
    setCommonCompareFilter,
    getLocations,
    getCompareLocations,
    getCountryDefaults,
    setInput,
    setInputCompare
  }
)(AnalyzerFilters);
