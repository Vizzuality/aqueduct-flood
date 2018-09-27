import { connect } from 'react-redux';

// actions
import { setWidgetsCompare } from 'modules/widgets-compare/actions';

// component
import RiskCompare from "./component";

export default connect(
  state => ({
    tab: state.app.tab,
    filters: { ...state.filters.common, ...state.filters.risk },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.risk }
  }),
  { setWidgetsCompare },
)(RiskCompare);
