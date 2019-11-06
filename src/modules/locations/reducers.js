import * as actions from './actions';

export default {
  [actions.setLocations]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setCompareLocations]: (state, { payload }) => ({ ...state, listCompare: payload }),
  [actions.setDefaultsLoading]: (state, { payload }) => ({ ...state, loaders: { ...state.loaders, defaults: payload } }),
  [actions.setCompareDefaultsLoading]: (state, { payload }) => ({ ...state, loaders: { ...state.loaders, compareDefaults: payload } })
};
