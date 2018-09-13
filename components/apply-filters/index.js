import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

import ApplyFilters from "./component";

export default connect(
  state => ({ applied: state.app.filters.applied }),
  { applyFilters }
)(ApplyFilters);
