import { connect } from 'react-redux';

// actions
import { clearFilters } from 'modules/filters/actions';
import { clearCompareFilters } from 'modules/filters-compare/actions';

// component
import RiskCompare from "./component";

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.risk },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.risk }
  }),
  {
    clearFilters,
    clearCompareFilters
  },
)(RiskCompare);
