import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';
import { fetchCache } from 'modules/cba-cache/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.cba },
    originalFormatFilters: state.filters,
    filtersStatus: state.app.filters,
    widgets: state.widgets,
    cbaCache: state.cbaCache
  }),
  {
    applyFilters,
    setModal,
    fetchCache
  }
)(AnalyzerOutputs);
