import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';
import { setCompareFilter } from 'modules/filters-compare/actions';

export const setWidgetData = createAction('WIDGETS__SET-WIDGET-DATA');
export const setLoading = createAction('WIDGETS__SET-LOADING');
export const setError = createAction('WIDGETS__SET-ERROR');

export const getWidgetData = createThunkAction('WIDGETS__GET-DATA', (widgetId) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();

    // provisional workflow for map widgets
    if (widgetId === 'sample_map') {
      dispatch(setWidgetData({ id: widgetId, data: [], type: 'map' }));
      return null;
    }

    const { state, locations, ...restFilters} = filtersCompare;

    const widgetParams = queryString.stringify({
      ...restFilters,
      ...{ geogunit_unique_name: state || filtersCompare.geogunit_unique_name  },
      ...{ existing_prot: filtersCompare.existing_prot || 'null' },
      ...{ user_urb_cost: filtersCompare.user_urb_cost || 'null' },
      ...{ user_rur_cost: 'null' },
      ...{ estimated_costs: 'null' }
    });

    dispatch(setLoading({ id: widgetId, loading: true }));

    fetch(`${process.env.API_URL}/cba/widget/${widgetId}?${widgetParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data, meta, chart_type: type }) => {
        const { startingProtection, om } = meta;

        dispatch(setLoading({ id: widgetId, loading: false }));
        dispatch(setCompareFilter({
          existing_prot: startingProtection,
          user_urb_cost: om,
        }))
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
