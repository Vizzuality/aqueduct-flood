import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setFilter]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.clearFilters]: state => ({ ...state, ...initialState })
};
