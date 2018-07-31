import * as actions from './actions';

export default {
  [actions.setRoutes]: (state, { payload }) => ({ ...state, ...payload }),
};
