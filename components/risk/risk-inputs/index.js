import { connect } from 'react-redux';

// actions
import { setModal, setInput } from 'modules/app/actions';
import { setRiskFilter } from 'modules/filters/actions';

import InputsRisk from 'components/risk/inputs';

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.risk },
    inputState: state.app.input
  }),
  {
    setModal,
    onChangeFilter: setRiskFilter,
    setInput
  }
)(InputsRisk);
