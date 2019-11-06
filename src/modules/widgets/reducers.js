import { WIDGETS } from 'data/widgets';

// actions
import * as actions from './actions';

export default {
  [actions.setWidgets]: (state, { payload }) => {
    const { nextTab } = payload;

    if (nextTab === 'advanced_risk') {
      return [...WIDGETS.risk, ...WIDGETS[nextTab]].map(widget => ({
        id: widget.id,
        params: widget.params || ({
          title: widget.title,
          description: widget.description,
          sources: widget.sources
        }),
        data: widget.data || [],
        loading: widget.loading || false,
        error: widget.error || null
      }));
    }

    return [...WIDGETS[nextTab]].map(widget => ({
      id: widget.id,
      params: widget.params || ({
        title: widget.title,
        description: widget.description,
        sources: widget.sources
      }),
      data: widget.data || [],
      loading: widget.loading || false,
      error: widget.error || null
    }));
  },
  [actions.resetWidgets]: (state, { payload: tab }) =>
    WIDGETS[tab].map(_widget => ({
      id: _widget.id,
      params: _widget.params || ({
        title: _widget.title,
        description: _widget.description,
        sources: _widget.sources
      }),
      data: _widget.data || [],
      loading: _widget.loading || false,
      error: _widget.error || null
    })),
  [actions.setEmbedWidget]: (state, { payload }) => {
    const { nextTab, id } = payload;

    const embedWidget = WIDGETS[nextTab].find(_w => _w.id === id );
    return [{
      id: embedWidget.id,
      params: embedWidget.params || ({ title: embedWidget.title }),
      data: embedWidget.data || [],
      loading: embedWidget.loading || false,
      error: embedWidget.error || null
    }];
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
