import { createAction, createThunkAction } from 'redux-tools';
import * as queryString from 'query-string';

export const setReady = createAction('CBA-CACHE__SET-READY');
export const setLoading = createAction('CBA-CACHE__SET-LOADING');

export const fetchCache = createThunkAction('CBA-CACHE__FETCH-CACHE', () =>
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

    dispatch(setLoading(true));
    dispatch(setReady(false));

    fetch(`${process.env.API_URL}/cba?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(() => {
        dispatch(setLoading(false));
        dispatch(setReady(true));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
});


export default {
  setReady,
  setLoading,
  fetchCache
};
