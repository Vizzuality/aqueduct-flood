import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter, clearCompareFilters } from 'modules/filters-compare/actions';

import AnalyzerCompareFilters from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.location && { location: state.filters.location },
      ...state.filters.scenario && { scenario: state.filters.scenario },
      locationCompare: state.filtersCompare.location,
      ...state.filtersCompare.scenario && { scenarioCompare: state.filtersCompare.scenario },
    }
  }),
  {
    setFilter,
    setCompareFilter,
    clearCompareFilters
  }
)(AnalyzerCompareFilters);
