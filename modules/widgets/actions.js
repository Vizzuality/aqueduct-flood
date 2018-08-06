import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import { WIDGETS } from 'mocks/widgets';

const JSONA = new Jsona();

export const setWidgetInitialStatus = createAction('WIDGETS__SET-WIDGET-INITIAL-STATUS');
export const setWidgetData = createAction('WIDGETS__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS__SET-LOADING');
export const setError = createAction('WIDGETS__SET-ERROR');

export const getWidgetData = createThunkAction('WIDGETS__GET-LOCATIONS', (widgetId) =>
  (dispatch, getState) => {
    const { widgets } = getState();

    // adds default state of the widget in it's not in the store previously
    if (!widgets[widgetId]) dispatch(setWidgetInitialStatus({ id: widgetId }));

    // mockup – beginning
    dispatch(setWidgetData({ id: widgetId, data: WIDGETS.find(w => w.id === widgetId).data }));
    window.setTimeout(() => { dispatch(setLoading({ id: widgetId, loading: false })) }, 1500);
    // mockup – end

    // fetch(`${process.env.API_URL}/widgets/${widgetId}`, {})
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //     throw response;
    //   })
    //   .then((data) => {
    //     dispatch(setWidgetData({ id: widgetId, data: JSONA.deserialize(data) }));
    //     dispatch(setLoading({ id: widgetId, loading: false }));
    //   })
    //   .catch((err) => {
    //     dispatch(setLoading({ id: widgetId, loading: false }));
    //     if (err && typeof err.json === 'function') {
    //       err.json()
    //         .then((errs) => {
    //           dispatch(setError({ id: widgetId, error: errs }));
    //         });
    //     } else {
    //       dispatch(setError({ id: widgetId, error: err }));
    //     }
    //   });
});

export default {
  setWidgetInitialStatus,
  setWidgetData,
  setLoading,
  setError,
  getWidgetData
};
