import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    widgets: state.widgets,
    filtersStatus: state.app.filters,
    filters: state.filters,
    filtersCompare: state.filtersCompare
  }),
  { applyFilters }
)(AnalyzerOutputs);
