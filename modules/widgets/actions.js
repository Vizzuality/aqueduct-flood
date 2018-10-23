import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

// helpers
import { fecthSideMap } from 'modules/layers/helpers';

// utils
import { getUniqueVocabulary } from 'utils/cba';

export const setWidgets = createAction('WIDGETS__SET-WIDGETS');
export const setEmbedWidget = createAction('WIDGETS__SET-EMBED-WIDGET');
export const setWidgetData = createAction('WIDGETS__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS__SET-LOADING');
export const setError = createAction('WIDGETS__SET-ERROR');

export const getWidgetCostData = createThunkAction('WIDGETS__GET-CBA-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

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

export const getWidgetMapData = createThunkAction('WIDGETS__GET-WIDGET-MAP-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();
    const { common } = filters;
    const { scenario } = common;

    const leftVocabulary = getUniqueVocabulary({
      year: '1980.0',
      scenario
    });

    const rightVocabulary = getUniqueVocabulary({
      year: '2080',
      scenario
    }, true);

    const leftQueryParams = queryString.stringify({ aqueductfloods: leftVocabulary });
    const rightQueryParams = queryString.stringify({ aqueductfloods: rightVocabulary });
    const lefSidefetch = fecthSideMap(leftQueryParams);
    const rightSidefetch = fecthSideMap(rightQueryParams);

    dispatch(setError({ id: widgetId, error: null }));
    dispatch(setLoading({ id: widgetId, loading: true }));

    Promise.all([lefSidefetch, rightSidefetch])
      .then((_layers) => {
        dispatch(setWidgetData({
          id: widgetId,
          data: {
            left: _layers[0],
            right: _layers[1]
          }
        }));
        dispatch(setLoading({ id: widgetId, loading: false }));
      })
  });

export const getWidgetRiskData = createThunkAction('WIDGETS__GET-RISK-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

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

export default {
  setWidgets,
  setEmbedWidget,
  setWidgetData,
  setLoading,
  setError,

  getWidgetCostData,
  getWidgetMapData,
  getWidgetRiskData
};
