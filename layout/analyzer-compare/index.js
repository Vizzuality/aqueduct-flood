import { connect } from 'react-redux';
import { setTab } from 'modules/app/actions';
import AnalyzerCompare from "./component";

export default connect(
  () => ({}),
  { setTab }
)(AnalyzerCompare);
