import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: state.filters,
    filtersStatus: state.app.filters,
  }),
  { applyFilters }
)(AnalyzerOutputs);
