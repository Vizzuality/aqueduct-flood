import { connect } from 'react-redux';

// actions
import { applyFilters } from 'modules/app/actions';
import { fetchCache } from 'modules/cba-cache/actions';

// component
import ApplyFilters from "./component";

export default connect(
  state => ({
    applied: state.app.filters.applied,
    filters: state.filters,
    tab: state.app.tab,
    filtersCompare: state.filtersCompare
  }),
  {
    applyFilters,
    fetchCache
  }
)(ApplyFilters);
