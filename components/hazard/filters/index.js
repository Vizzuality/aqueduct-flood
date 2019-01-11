import { connect } from 'react-redux';

// acctions
import { setModal } from 'modules/app/actions';
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
    setModal,
    setHazardFilter,
    resetActiveLayers
  }
)(HazardFilters);
