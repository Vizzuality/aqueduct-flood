import { connect } from 'react-redux';

// actions
import { setWidgetsCompare } from 'modules/widgets-compare/actions';

// component
import AnalyzerCompare from "./component";

export default connect(
  state => ({
    tab: state.app.tab,
    filters: state.filters.common,
    filtersCompare: state.filtersCompare.common
  }),
  { setWidgetsCompare },
)(AnalyzerCompare);
