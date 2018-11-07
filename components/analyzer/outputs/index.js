import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';

// selectors
import { getLocationData } from 'modules/locations/selectors';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    filters: { ...state.filters.common, ...state.filters.cba },
    originalFormatFilters: state.filters,
    filtersStatus: state.app.filters,
    widgets: state.widgets,
    currentLocation: getLocationData(state)
  }),
  {
    applyFilters,
    setModal
  }
)(AnalyzerOutputs);
