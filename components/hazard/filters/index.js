import { connect } from 'react-redux';

// acctions
import { setHazardFilter } from 'modules/filters/actions';
import { resetActiveLayers } from 'modules/layers/actions';

// component
import HazardFilters from "./component";
import { updatedTimeline } from './selectors';

export default connect(
  state => ({
    years: updatedTimeline(state),
    filters: { ...state.filters.hazard }
  }),
  {
    setHazardFilter,
    resetActiveLayers
  }
)(HazardFilters);
