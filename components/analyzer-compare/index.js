import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';

import AnalyzerCompare from "./component";

export default connect(
  null,
  {
    setFilter,
    setCompareFilter
  },
)(AnalyzerCompare);
