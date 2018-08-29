import { connect } from 'react-redux';

// actions
import { setModal, setInput } from 'modules/app/actions';
import { setFilter } from 'modules/filters/actions';
import { getCountryDefaults } from 'modules/locations/actions';

import InputsAnalyzer from 'components/analyzer/inputs';

export default connect(
  state => ({
    filters: state.filters,
    inputState: state.app.input
  }),
  {
    setModal,
    onChangeFilter: setFilter,
    getCountryDefaults,
    setInput
  }
)(InputsAnalyzer);
