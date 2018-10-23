import { connect } from 'react-redux';

import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// component
import HazardLegend from './component';

export { actions, reducers, initialState };

export default connect(
  state => ({ hazardLegend: state.hazardLegend }),
  { setReturnPeriod: actions.setReturnPeriod }
)(HazardLegend);
