import { connect } from 'react-redux';

// component
import AnalyzerCompare from "./component";

export default connect(
  state => ({ filtersCompare: state.filtersCompare.common }),
  null,
)(AnalyzerCompare);
