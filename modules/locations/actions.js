import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

// import { list } from './initial-state';

export const setLocations = createAction('LOCATIONS__SET-LOCATIONS');
export const setCompareLocations = createAction('LOCATIONS__SET-COMPARE-LOCATIONS');
export const setDefaultsLoading = createAction('LOCATIONS__SET-DEFAULTS-LOADING');
export const setCompareDefaultsLoading = createAction('LOCATIONS__SET-COMPARE-DEFAULTS-LOADING');

export const getLocations = createThunkAction('LOCATIONS__GET-LOCATIONS', value =>
  (dispatch) => {
    const queryParams = queryString.stringify({ q: value });

    // dispatch(setLocations(list));

    fetch(`/api/locations?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        dispatch(setLocations(data));
      })
      .catch((err) => {
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

export const getCompareLocations = createThunkAction('LOCATIONS__GET-COMPARE-LOCATIONS', value =>
  (dispatch) => {
    const queryParams = queryString.stringify({ q: value });

    dispatch(setCompareLocations([]));

    fetch(`/api/locations?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        dispatch(setCompareLocations(data));
      })
      .catch((err) => {
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

export const getCountryDefaults = createThunkAction('LOCATIONS__GET-COUNTRY-DEFAULTS', (setFilter) =>
  (dispatch, getState) => {
    const { filters } = getState();
    const {
      geogunit_unique_name,
      scenario
    } = filters.common;

    const queryParams = queryString.stringify({
      geogunit_unique_name,
      scenario
    });

    dispatch(setDefaultsLoading(true));

    return fetch(`${process.env.API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        dispatch(setDefaultsLoading(false));
        const defaults = data[0] || {};
        setFilter({ ...defaults });

        return { ...defaults };
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

export const getCompareCountryDefaults = createThunkAction('LOCATIONS__GET-COMPARE-COUNTRY-DEFAULTS', (setCompareFilter) =>
  (dispatch, getState) => {
    const { filtersCompare } = getState();
    const {
      geogunit_unique_name,
      scenario
    } = filtersCompare.common;

    const queryParams = queryString.stringify({
      geogunit_unique_name,
      scenario
    });

    dispatch(setCompareDefaultsLoading(true));

    return fetch(`${process.env.API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        dispatch(setCompareDefaultsLoading(false));
        const defaults = data[0] || {};
        setCompareFilter({ ...defaults });
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
