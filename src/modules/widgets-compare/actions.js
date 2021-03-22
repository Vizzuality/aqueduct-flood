import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

// helpers
import { fecthSideMap } from 'modules/layers/helpers';

// utils
import { getUniqueVocabulary } from 'utils/cba';

export const setWidgetsCompare = createAction('WIDGETS-COMPARE__SET-WIDGETS');
export const resetWidgetsCompare = createAction('WIDGETS-COMPARE__RESET-WIDGETS');
export const setWidgetData = createAction('WIDGETS-COMPARE__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS-COMPARE__SET-LOADING');
export const setError = createAction('WIDGETS-COMPARE__SET-ERROR');

export const getWidgetCostData = createThunkAction('WIDGETS-COMPARE__GET-CBA-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();
    const { common, cba } = filtersCompare;
    const widgetParams = queryString.stringify({
      ...common,
      ...cba,
      ...{ discount_rate: filtersCompare.cba.discount_rate / 100 },
      ...{ om_costs: filtersCompare.cba.om_costs / 100 },
      ...{ user_urb_cost: filtersCompare.cba.user_urb_cost || 'null' },
      ...{ user_rur_cost: 'null' }
    });

    dispatch(setError({ id: widgetId, error: null }));
    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.REACT_APP_API_URL}/cba/widget/${widgetId}?${widgetParams}`, {})
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

export const getWidgetMapData = createThunkAction('WIDGETS-COMPARE__GET-WIDGET-MAP-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();
    const { common, cba } = filtersCompare;
    const { scenario } = common;
    const { ref_year: refYear } = cba;

    const leftVocabulary = getUniqueVocabulary({
      year: '2010.0',
      scenario,
    });
    const rightVocabulary = getUniqueVocabulary({
      year: `${refYear}.0`,
      scenario,
    }, true);

    const leftQueryParams = queryString.stringify({ aqueductfloods_v2: leftVocabulary, application: 'aqueduct' });
    const rightQueryParams = queryString.stringify({ aqueductfloods_v2: rightVocabulary, application: 'aqueduct' });
    const lefSidefetch = fecthSideMap(leftQueryParams);
    const rightSidefetch = fecthSideMap(rightQueryParams);

    dispatch(setError({ id: widgetId, error: null }));
    dispatch(setLoading({ id: widgetId, loading: true }));

    Promise.all([lefSidefetch, rightSidefetch])
      .then((_layers) => {
        dispatch(setWidgetData({
          id: widgetId,
          ...{
            data: {
              left: [..._layers[0]],
              right: [..._layers[1]]
            }
          }
        }));
        dispatch(setLoading({ id: widgetId, loading: false }));
      })
  });

export const getWidgetRiskData = createThunkAction('WIDGETS-COMPARE__GET-RISK-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();
    const { common, risk } = filtersCompare;
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

    fetch(`${process.env.REACT_APP_API_URL}/risk/widget/${widgetId}?${widgetParams}`, {})
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
  setWidgetsCompare,
  resetWidgetsCompare,
  setWidgetData,
  setLoading,
  setError,

  getWidgetCostData,
  getWidgetMapData,
  getWidgetRiskData
};
