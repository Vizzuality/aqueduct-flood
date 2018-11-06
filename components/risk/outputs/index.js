import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.risk },
    originalFormatFilters: state.filters,
    filtersStatus: state.app.filters,
    widgets: state.widgets
  }),
  {
    setModal,
    applyFilters
  }
)(AnalyzerOutputs);
