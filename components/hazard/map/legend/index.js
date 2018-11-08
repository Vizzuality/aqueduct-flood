import { connect } from 'react-redux';

import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// selectors
import { updatedOptions } from './selectors';

// component
import HazardLegend from './component';

export { actions, reducers, initialState };

export default connect(
  state => ({ options: updatedOptions(state) }),
  { onChangePeriod: actions.setReturnPeriod }
)(HazardLegend);
