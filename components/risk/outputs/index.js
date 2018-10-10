import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.risk },
    originalFormatFilters: state.filters,
    widgets: state.widgets
  }),
  { applyFilters }
)(AnalyzerOutputs);
