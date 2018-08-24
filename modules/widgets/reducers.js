import * as actions from './actions';

export default {
  [actions.setWidgetData]: (state, { payload }) => {
    const widgetIndex = state.findIndex(w => w.id === payload.id);
    const newState = [...state];

    newState[widgetIndex] = {
      ...newState[widgetIndex],
      params: {
        ...newState[widgetIndex].params,
        ...{ type: payload.type }
      },
      data: payload.data
    };

    return newState;
  },
  [actions.setLoading]: (state, { payload }) => {
    const widgetIndex = state.findIndex(w => w.id === payload.id);
    const newState = [...state];

    newState[widgetIndex] = {
      ...newState[widgetIndex],
      loading: payload.loading
    };

    return newState;
  },
  [actions.setError]: (state, { payload }) => {
    const widgetIndex = state.findIndex(w => w.id === payload.id);
    const newState = [...state];

    newState[widgetIndex] = {
      ...newState[widgetIndex],
      error: payload.error
    };

    return newState;
  }
};
