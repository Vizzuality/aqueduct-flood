import { connect } from 'react-redux';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: state.filters,
    filtersCompare: state.filtersCompare
  })
)(AnalyzerOutputs);
