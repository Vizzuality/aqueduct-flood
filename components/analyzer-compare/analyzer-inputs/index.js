import { connect } from 'react-redux';

// actions
import { setModal, setInputCompare } from 'modules/app/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';
import { getCompareCountryDefaults } from 'modules/locations/actions';

import InputsAnalyzerCompare from 'components/analyzer/inputs';

export default connect(
  state => ({
    filters: state.filtersCompare,
    inputState: state.app.inputCompare
  }),
  {
    setModal,
    onChangeFilter: setCompareFilter,
    getCountryDefaults: getCompareCountryDefaults,
    setInput: setInputCompare
  }
)(InputsAnalyzerCompare);
