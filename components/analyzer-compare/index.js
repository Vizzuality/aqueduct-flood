import { connect } from 'react-redux';
import { setTab } from 'modules/app/actions';
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';

import AnalyzerCompare from "./component";

export default connect(
  state => ({
    filters: state.filters,
    filtersCompare: state.filtersCompare
  }),
  {
    setTab,
    setFilter,
    setCompareFilter
  },
)(AnalyzerCompare);
