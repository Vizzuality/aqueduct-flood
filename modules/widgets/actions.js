import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

export const setWidgetData = createAction('WIDGETS__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS__SET-LOADING');
export const setError = createAction('WIDGETS__SET-ERROR');

export const getWidgetData = createThunkAction('WIDGETS__GET-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filters } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const widgetParams = queryString.stringify({
      ...filters,
      ...{ user_rur_cost: 'null' },
      ...{ estimated_costs: 'null' }
    });

    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.API_URL}/cba/widget/${widgetId}?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data, chart_type: type }) => {
        dispatch(setLoading({ id: widgetId, loading: false }));
        dispatch(setWidgetData({ id: widgetId, data, type }));
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
  getWidgetData
};
