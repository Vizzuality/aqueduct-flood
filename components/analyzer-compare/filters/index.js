import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter, clearCompareFilters } from 'modules/filters-compare/actions';
import {
  getLocations,
  getCompareLocations,
  setCompareLocations,
  getCountryDefaults,
  getCompareCountryDefaults
} from 'modules/locations/actions';
import { setInput, setInputCompare } from 'modules/app/actions';

// selectors
import { parseLocations, parseCompareLocations } from 'components/analyzer/filters/selectors';

import AnalyzerCompareFilters from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.geogunit_unique_name && { location: state.filters.geogunit_unique_name },
      ...state.filters.state && { state : state.filters.state },
      ...state.filters.scenario && { scenario: state.filters.scenario },
      locationCompare: state.filtersCompare.geogunit_unique_name,
      ...state.filtersCompare.state && { stateCompare : state.filtersCompare.state },
      ...state.filtersCompare.scenario && { scenarioCompare: state.filtersCompare.scenario },
    },
    locations: parseLocations(state),
    locationsCompare: parseCompareLocations(state)
  }),
  {
    setFilter,
    setCompareFilter,
    clearCompareFilters,
    getLocations,
    getCompareLocations,
    setCompareLocations,
    getCountryDefaults,
    getCompareCountryDefaults,
    setInput,
    setInputCompare
  }
)(AnalyzerCompareFilters);
