import { connect } from 'react-redux';
import { setModal } from 'modules/app/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';

import InputsAnalyzerCompare from 'components/analyzer/inputs';

export default connect(
  state => ({ filters: state.filtersCompare }),
  {
    setModal,
    onChangeFilter: setCompareFilter
  }
)(InputsAnalyzerCompare);
