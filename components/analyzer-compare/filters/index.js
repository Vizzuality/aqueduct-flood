import { connect } from 'react-redux';
import { setCommonFilter } from 'modules/filters/actions';
import { setCommonCompareFilter, clearCompareFilters } from 'modules/filters-compare/actions';
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
      ...state.filters.common.geogunit_unique_name && { location: state.filters.common.geogunit_unique_name },
      ...state.filters.common.scenario && { scenario: state.filters.common.scenario },
      locationCompare: state.filtersCompare.common.geogunit_unique_name,
      ...state.filtersCompare.common.scenario && { scenarioCompare: state.filtersCompare.common.scenario },
    },
    locations: parseLocations(state),
    locationsCompare: parseCompareLocations(state)
  }),
  {
    setCommonFilter,
    setCommonCompareFilter,
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
