import { connect } from 'react-redux';

// acctions
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';
import { getLocations, getCompareLocations, getCountryDefaults } from 'modules/locations/actions';
import { setInput, setInputCompare } from 'modules/app/actions';

// selectors
import { parseLocations, parseCompareLocations } from './selectors';

// component
import AnalyzerFilters from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.geogunit_unique_name && { location : state.filters.geogunit_unique_name },
      ...state.filters.state && { state : state.filters.state },
      ...state.filters.scenario && { scenario : state.filters.scenario },
      ...state.filtersCompare.geogunit_unique_name && { compareLocation : state.filtersCompare.geogunit_unique_name }
    },
    locations: parseLocations(state),
    locationsCompare: parseCompareLocations(state)
  }),
  {
    setFilter,
    setCompareFilter,
    getLocations,
    getCompareLocations,
    getCountryDefaults,
    setInput,
    setInputCompare
  }
)(AnalyzerFilters);
