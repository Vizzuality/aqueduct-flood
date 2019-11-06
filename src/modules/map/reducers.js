import * as actions from './actions';

export default {
  [actions.setMapOptions]: (state, { payload }) => ({ ...state, ...payload }),
};
