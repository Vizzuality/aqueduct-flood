import { connect } from 'react-redux';

// acctions
import { setHazardFilter } from 'modules/filters/actions';

// component
import HazardFilters from "./component";

export default connect(
  state => ({ filters: { ...state.filters.hazard } }),
  { setHazardFilter }
)(HazardFilters);
