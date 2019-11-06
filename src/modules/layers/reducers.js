import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setLayers]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setActiveLayer]: (state, { payload }) => ({ ...state, activeLayers: payload }),
  [actions.resetActiveLayers]: state => ({ ...state, activeLayers: initialState.activeLayers }),
  [actions.setLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setError]: (state, { payload }) => ({ ...state, error: payload }),
  [actions.clearLayers]: state => ({ ...state, list: initialState.list })
};
