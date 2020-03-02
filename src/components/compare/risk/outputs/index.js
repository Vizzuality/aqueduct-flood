import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    widgets: state.widgetsCompare,
    originalFormatFilters: state.filters,
    filters: { ...state.filters.common, ...state.filters.risk },
    originalFormatCompareFilters: state.filtersCompare,
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.risk }
  }),
  {
    applyFilters,
    setModal
  }
)(AnalyzerOutputs);
