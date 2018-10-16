import * as actions from './actions';

export default {
  [actions.setReady]: (state, { payload }) => ({ ...state, ready: payload }),
  [actions.setLoading]: (state, { payload }) => ({ ...state, loading: payload })
};
