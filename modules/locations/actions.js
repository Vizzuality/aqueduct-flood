import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

const JSONA = new Jsona();

export const setLocations = createAction('LOCATIONS__SET-LOCATIONS');
export const setLoading = createAction('LOCATIONS__SET-LOADING');
export const setError = createAction('LOCATIONS__SET-ERROR');

export const getLocations = createThunkAction('LOCATIONS__GET-LOCATIONS', () =>
  (dispatch) =>
    fetch(`${process.env.API_URL}/locations`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        dispatch(setLocations(JSONA.deserialize(data).counties));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err && typeof err.json === 'function') {
          err.json()
            .then((errs) => {
              dispatch(setError(errs));
            });
        } else {
          dispatch(setError(err));
        }
    }))

export default {
  setLocations,
  setLoading,
  setError,
  getLocations
};
