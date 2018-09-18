import { connect } from 'react-redux';

// component
import RiskCompare from "./component";

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.risk },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.risk }
  }),
  null,
)(RiskCompare);
