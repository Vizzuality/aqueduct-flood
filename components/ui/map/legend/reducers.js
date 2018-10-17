import * as actions from './actions';

export default {
  [actions.setReturnPeriod]: (state, { payload }) => ({ ...state, returnPeriod: payload })
};
