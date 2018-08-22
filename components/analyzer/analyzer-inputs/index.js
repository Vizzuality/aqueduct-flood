import { connect } from 'react-redux';
import { setModal } from 'modules/app/actions';
import { setFilter } from 'modules/filters/actions';

import InputsAnalyzer from 'components/analyzer/inputs';

export default connect(
  state => ({ filters: state.filters }),
  {
    setModal,
    onChangeFilter: setFilter
  }
)(InputsAnalyzer);
