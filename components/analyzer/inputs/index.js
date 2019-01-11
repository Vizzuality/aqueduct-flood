import { connect } from 'react-redux';

// actions
import { setModal } from 'modules/app/actions';

// component
import InputsAnalyzer from "./component";

export default connect(
  null,
  { setModal }
)(InputsAnalyzer);
