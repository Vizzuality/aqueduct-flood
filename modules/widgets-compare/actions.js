import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

export const setWidgets = createAction('WIDGETS-COMPARE__SET-WIDGETS');
export const setWidgetData = createAction('WIDGETS-COMPARE__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS-COMPARE__SET-LOADING');
export const setError = createAction('WIDGETS-COMPARE__SET-ERROR');

export const getWidgetCostData = createThunkAction('WIDGETS-COMPARE__GET-CBA-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { common, cba } = filtersCompare;

    const widgetParams = queryString.stringify({
      ...common,
      ...cba,
      ...{ discount_rate: filtersCompare.cba.discount_rate / 100 },
      ...{ om_costs: filtersCompare.cba.om_costs / 100 },
      ...{ user_urb_cost: filtersCompare.cba.user_urb_cost || 'null' },
      ...{ user_rur_cost: 'null' }
    });

    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.API_URL}/cba/widget/${widgetId}?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data, chart_type: type, meta }) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        dispatch(setWidgetData({ id: widgetId, data, type, meta }));
      })
      .catch((err) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              dispatch(setError({ id: widgetId, error: errs }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err }));
        }
      });
});

export const getWidgetRiskData = createThunkAction('WIDGETS-COMPARE__GET-RISK-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { common, risk } = filtersCompare;

    const widgetParams = queryString.stringify({
      ...common,
      ...risk
    });

    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.API_URL}/risk/widget/${widgetId}?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data, chart_type: type, meta }) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        dispatch(setWidgetData({ id: widgetId, data, type, meta }));
      })
      .catch((err) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              dispatch(setError({ id: widgetId, error: errs }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err }));
        }
      });
});

export const getWidgetHazardData = createThunkAction('WIDGETS-COMPARE__GET-HAZARD-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { common, hazard } = filters;

    const widgetParams = queryString.stringify({
      ...common,
      ...hazard
    });

    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.API_URL}/hazard/widget/${widgetId}?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data, chart_type: type, meta }) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        dispatch(setWidgetData({ id: widgetId, data, type, meta }));
      })
      .catch((err) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              dispatch(setError({ id: widgetId, error: errs }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err }));
        }
      });
});

export default {
  setWidgetData,
  setLoading,
  setError,
  getWidgetCostData,
  getWidgetRiskData,
  getWidgetHazardData
};
