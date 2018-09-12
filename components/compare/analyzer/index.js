import { connect } from 'react-redux';

// component
import AnalyzerCompare from "./component";

export default connect(
  state => ({
    filters: state.filters.common,
    filtersCompare: state.filtersCompare.common
  }),
  null,
)(AnalyzerCompare);
