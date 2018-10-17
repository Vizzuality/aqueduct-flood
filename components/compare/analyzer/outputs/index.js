import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    widgets: state.widgets,
    filtersStatus: state.app.filters,
    filters: { ...state.filters.common, ...state.filters.cba },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.cba },
    originalFormatFilters: state.filters,
    originalFormatCompareFilters: state.filtersCompare
  }),
  {
    applyFilters,
    setModal
  }
)(AnalyzerOutputs);
