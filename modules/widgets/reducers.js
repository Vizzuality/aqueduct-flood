import { WIDGETS } from 'data/widgets';

// actions
import * as actions from './actions';

export default {
  [actions.setWidgets]: (state, { payload }) => {
    const { nextTab } = payload;

    return WIDGETS[nextTab].map(widget => ({
      id: widget.id,
      params: { title: widget.title },
      data: [],
      loading: false,
      error: null
    }));
  },
  [actions.setWidgetData]: (state, { payload }) => {
    const widgetIndex = state.findIndex(w => w.id === payload.id);
    const newState = [...state];

    newState[widgetIndex] = {
      ...newState[widgetIndex],
      params: {
        ...newState[widgetIndex].params,
        ...{ type: payload.type },
        ...payload.meta
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
