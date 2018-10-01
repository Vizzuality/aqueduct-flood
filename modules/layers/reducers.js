import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setLayers]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setActiveLayer]: (state, { payload }) => ({ ...state, activeLayer: payload }),
  [actions.setLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setError]: (state, { payload }) => ({ ...state, error: payload }),
  [actions.clearLayers]: state => ({ ...state, list: initialState.list })
};
