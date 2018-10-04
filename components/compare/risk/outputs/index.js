import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    widgets: state.widgetsCompare,
    // filtersStatus: state.app.filters,
    filters: { ...state.filters.common, ...state.filters.risk },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.risk }
  }),
  { applyFilters }
)(AnalyzerOutputs);
