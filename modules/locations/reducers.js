import * as actions from './actions';

export default {
  [actions.setLocations]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setCompareLocations]: (state, { payload }) => ({ ...state, listCompare: payload })
};
