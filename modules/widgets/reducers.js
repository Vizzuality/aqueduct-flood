import * as actions from './actions';

export default {
  [actions.setWidgetInitialStatus]: (state, { payload }) => ({
    ...state,
    [payload.id]: {
      data: [],
      loading: true,
      error: null
    }
  }),
  [actions.setWidgetData]: (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      data: payload.data
    }
  }),
  [actions.setLoading]: (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      loading: payload.loading
    }
  }),
  [actions.setError]: (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      error: payload.error
    }
  })
};
