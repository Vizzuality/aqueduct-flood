import { createAction, createThunkAction } from 'redux-tools';
import queryString from 'query-string';

// actions
import { setFilter } from 'modules/filters/actions';
import { setCompareFilter } from 'modules/filters-compare/actions';

export const setLocations = createAction('LOCATIONS__SET-LOCATIONS');
export const setCompareLocations = createAction('LOCATIONS__SET-COMPARE-LOCATIONS');

export const getLocations = createThunkAction('LOCATIONS__GET-LOCATIONS', value =>
  (dispatch) => {

    const queryParams = queryString.stringify({ q: value });

    dispatch(setLocations([]));

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

export const getCountryDefaults = createThunkAction('LOCATIONS__GET-COUNTRY-DEFAULTS', () =>
  (dispatch, getState) => {
    const { filters } = getState();
    const {
      geogunit_unique_name,
      scenario
    } = filters;

    const queryParams = queryString.stringify({
      geogunit_unique_name,
      scenario
    });

    return fetch(`${process.env.API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        const defaults = data[0] || {};
        dispatch(setFilter({ ...defaults }));
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

export const getCompareCountryDefaults = createThunkAction('LOCATIONS__GET-COMPARE-COUNTRY-DEFAULTS', () =>
  (dispatch, getState) => {

    const { filtersCompare } = getState();
    const {
      geogunit_unique_name,
      scenario
    } = filtersCompare;

    const queryParams = queryString.stringify({
      geogunit_unique_name,
      scenario
    });

    return fetch(`${process.env.API_URL}/cba/default?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(({ data }) => {
        const defaults = data[0] || {};
        dispatch(setCompareFilter({ ...defaults }));
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

export default {
  setLocations,
  setCompareLocations,
  getLocations,
  getCompareLocations,
  getCountryDefaults
};
