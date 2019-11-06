import { connect } from 'react-redux';

// actions
import { setModal } from 'modules/app/actions';
import {
  setExistingProt,
  setProtFut,
  setExistingProtCompare,
  setProtFutCompare
} from 'modules/widget-map/actions';

// component
import InputsAnalyzer from "./component";

export default connect(
  null,
  {
    setModal,
    setExistingProt,
    setProtFut,
    setExistingProtCompare,
    setProtFutCompare
  }
)(InputsAnalyzer);
