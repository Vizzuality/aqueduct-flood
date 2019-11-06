import { connect } from 'react-redux';

// actions
import { applyFilters, setModal } from 'modules/app/actions';

// selectors
import { getLocationData, getLocationDataCompare } from 'modules/locations/selectors';

// component
import AnalyzerOutputs from './component';

export default connect(
  state => ({
    widgets: state.widgets,
    filtersStatus: state.app.filters,
    filters: { ...state.filters.common, ...state.filters.cba },
    filtersCompare: { ...state.filtersCompare.common, ...state.filtersCompare.cba },
    originalFormatFilters: state.filters,
    originalFormatCompareFilters: state.filtersCompare,
    currentLocation: getLocationData(state),
    currentLocationCompare: getLocationDataCompare(state)
  }),
  {
    applyFilters,
    setModal
  }
)(AnalyzerOutputs);
