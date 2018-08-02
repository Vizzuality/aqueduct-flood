import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setCompareFilter]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.clearCompareFilters]: state => ({ ...state, ...initialState })
};
