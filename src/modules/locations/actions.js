import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';
import { getLocationByQuery } from 'api/locations';

export const setLocations = createAction('LOCATIONS__SET-LOCATIONS');
export const setCompareLocations = createAction('LOCATIONS__SET-COMPARE-LOCATIONS');
export const setDefaultsLoading = createAction('LOCATIONS__SET-DEFAULTS-LOADING');
export const setCompareDefaultsLoading = createAction('LOCATIONS__SET-COMPARE-DEFAULTS-LOADING');

export const getLocations = createThunkAction('LOCATIONS__GET-LOCATIONS', value =>
  (dispatch) => {
    const data = getLocationByQuery(value);
    dispatch(setLocations(data));
  })

export const getCompareLocations = createThunkAction('LOCATIONS__GET-COMPARE-LOCATIONS', value =>
  (dispatch) => {

    dispatch(setCompareLocations([]));
    const data = getLocationByQuery(value);
    dispatch(setCompareLocations(data));
  })

export const getCountryDefaults = createThunkAction('LOCATIONS__GET-COUNTRY-DEFAULTS', (params) =>
  (dispatch, getState) => {
    const { filters: { common } } = getState();
    const { scenario } = common;
    const { location, additionalParams } = params;

    const queryParams = queryString.stringify({
      geogunit_unique_name: location,
      scenario,
      ...additionalParams
    });


    dispatch(setDefaultsLoading(true));

    return fetch(`${process.env.REACT_APP_API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        dispatch(setDefaultsLoading(false));
        const defaults = data[0] || {};

        // if (tab === 'risk' ) setFilter({ existing_prot: defaults.existing_prot });
        // setFilter({
          // estimated_costs: defaults.estimated_costs,
          // existing_prot: defaults.existing_prot,
          // prot_fut: defaults.prot_fut
        //  });

        return ({ ...defaults });
      })
      .catch((err) => {
        dispatch(setDefaultsLoading(false));

        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              console.log(errs)
            });
        } else {
          console.log(err);
        }
    })
  })

export const getCompareCountryDefaults = createThunkAction('LOCATIONS__GET-COMPARE-COUNTRY-DEFAULTS', (params) =>
  (dispatch, getState) => {
    const { filtersCompare: { common } } = getState();
    const { scenario } = common;
    const { location, additionalParams } = params;

    const queryParams = queryString.stringify({
      geogunit_unique_name: location,
      scenario,
      ...additionalParams
    });

    dispatch(setCompareDefaultsLoading(true));

    return fetch(`${process.env.REACT_APP_API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        dispatch(setCompareDefaultsLoading(false));
        const defaults = data[0] || {};
        return ({ ...defaults });
      })
      .catch((err) => {
        dispatch(setCompareDefaultsLoading(false));

        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              console.log(errs)
            });
        } else {
          console.log(err);
        }
    })
  })

export default {
  setLocations,
  setCompareLocations,
  setDefaultsLoading,
  setCompareDefaultsLoading,

  getLocations,
  getCompareLocations,
  getCountryDefaults,
  getCompareCountryDefaults
};
