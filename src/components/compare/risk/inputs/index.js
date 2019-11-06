import { connect } from 'react-redux';

// actions
import { setModal, setInputCompare } from 'modules/app/actions';
import { setRiskCompareFilter } from 'modules/filters-compare/actions';

import InputsRiskCompare from 'components/risk/inputs';

export default connect(
  state => ({
    filters: state.filtersCompare.risk,
    inputState: state.app.inputCompare
  }),
  {
    setModal,
    onChangeFilter: setRiskCompareFilter,
    setInput: setInputCompare
  }
)(InputsRiskCompare);
