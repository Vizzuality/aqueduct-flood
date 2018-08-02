import * as actions from './actions';

export default {
  [actions.setCompareFilter]: (state, { payload }) => ({ ...state, ...payload })
};
