import { connect } from 'react-redux';
import { setCommonFilter, setCostFilter } from 'modules/filters/actions';
import {
  setCommonCompareFilter,
  setCostCompareFilter,
  clearCompareFilters
} from 'modules/filters-compare/actions';
import {
  getLocations,
  getCompareLocations,
  setCompareLocations,
  getCountryDefaults,
  getCompareCountryDefaults
} from 'modules/locations/actions';
import { setInput, setInputCompare } from 'modules/app/actions';
import { resetWidgets } from 'modules/widgets/actions';
import { resetWidgetsCompare } from 'modules/widgets-compare/actions';

// selectors
import { parseLocations, parseCompareLocations } from 'modules/locations/selectors';

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
    setCostFilter,
    setCommonCompareFilter,
    setCostCompareFilter,
    clearCompareFilters,
    getLocations,
    getCompareLocations,
    setCompareLocations,
    getCountryDefaults,
    getCompareCountryDefaults,
    setInput,
    setInputCompare,
    resetWidgets,
    resetWidgetsCompare
  }
)(AnalyzerCompareFilters);
