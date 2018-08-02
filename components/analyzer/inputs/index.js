import { connect } from 'react-redux';
import { setModal } from 'modules/app/actions';

import InputsAnalyzer from "./component";

export default connect(
  state => ({ filters: state.filters }),
  { setModal }
)(InputsAnalyzer);
