import { connect } from 'react-redux';
import { applyFilters, setIsNullTime } from 'modules/app/actions';

import ApplyFilters from "./component";

export default connect(
  () => ({}),
  { applyFilters, setIsNullTime }
)(ApplyFilters);
