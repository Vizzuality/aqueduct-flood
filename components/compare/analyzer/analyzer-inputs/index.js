import { connect } from 'react-redux';

// actions
import { setModal, setInputCompare } from 'modules/app/actions';
import { setCostCompareFilter } from 'modules/filters-compare/actions';
import { getCompareCountryDefaults } from 'modules/locations/actions';

import InputsAnalyzerCompare from 'components/analyzer/inputs';

export default connect(
  state => ({
    filters: state.filtersCompare.cba,
    inputState: state.app.inputCompare,
    isCompare: true
  }),
  {
    setModal,
    onChangeFilter: setCostCompareFilter,
    getCountryDefaults: getCompareCountryDefaults,
    setInput: setInputCompare
  }
)(InputsAnalyzerCompare);
