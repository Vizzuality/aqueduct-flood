import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';

import Analyzer from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.location && { location : state.filters.location },
      ...state.filters.scenario && { scenario : state.filters.scenario },
      ...state.filtersCompare.location && { compareLocation : state.filtersCompare.location }
    }
  }),
  {
    setFilter,
    setCompareFilter
  }
)(Analyzer);
