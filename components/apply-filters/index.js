import { connect } from 'react-redux';
import { applyFilters } from 'modules/app/actions';

import ApplyFilters from "./component";

export default connect(
  () => ({}),
  { applyFilters }
)(ApplyFilters);
