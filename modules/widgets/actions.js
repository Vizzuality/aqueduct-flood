import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

export const setWidgets = createAction('WIDGETS__SET-WIDGETS');
export const setEmbedWidget = createAction('WIDGETS__SET-EMBED-WIDGET');
export const setWidgetData = createAction('WIDGETS__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS__SET-LOADING');
export const setError = createAction('WIDGETS__SET-ERROR');

export const getWidgetCostData = createThunkAction('WIDGETS__GET-CBA-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { common, cba } = filters;

    const widgetParams = queryString.stringify({
      ...common,
      ...cba,
      ...{ discount_rate: filters.cba.discount_rate / 100 },
      ...{ om_costs: filters.cba.om_costs / 100 },
      ...{ user_urb_cost: filters.cba.user_urb_cost || 'null' },
      ...{ user_rur_cost: 'null' }
    });

    dispatch(setError({ id: widgetId, error: null }));
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
            .then(({ errors }) => {
              dispatch(setError({ id: widgetId, error: errors }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err.errors }));
        }
      });
});

export const getWidgetRiskData = createThunkAction('WIDGETS__GET-RISK-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { common, risk } = filters;
    const {
      advanced_settings: advancedSettings,
      estimated_costs: estimatedCosts,
      prot_fut: protFut,
      ...restRiskFilters
    } = risk;

    const {
      estimated_costs: estimatedCostsCommon,
      prot_fut: protFutCommon,
      ...restCommonParams
    } = common;

    const widgetParams = queryString.stringify({
      ...restCommonParams,
      ...restRiskFilters
    });

    dispatch(setError({ id: widgetId, error: null }));
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
            .then(({ errors }) => {
              dispatch(setError({ id: widgetId, error: errors }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err.errors }));
        }
      });
});

export const getWidgetHazardData = createThunkAction('WIDGETS__GET-HAZARD-DATA', (widgetId) =>
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

    dispatch(setError({ id: widgetId, error: null }));
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
            .then(({ errors }) => {
              dispatch(setError({ id: widgetId, error: errors }));
            });
        } else {
          dispatch(setError({ id: widgetId, error: err.errors }));
        }
      });
});

export default {
  setWidgets,
  setEmbedWidget,
  setWidgetData,
  setLoading,
  setError,

  getWidgetCostData,
  getWidgetRiskData,
  getWidgetHazardData
};
