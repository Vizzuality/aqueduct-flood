import { createAction, createThunkAction } from 'redux-tools';
import WRISerializer from 'wri-json-api-serializer';
import * as queryString from 'query-string';

// constants
import { FETCH_DATASET_ID } from 'constants/hazard';

export const setLayers = createAction('LAYERS__SET-LAYERS');
export const setActiveLayer = createAction('LAYERS__SET-ACTIVE-LAYER');
export const deleteActiveLayer = createAction('LAYERS__DELETE-ACTIVE-LAYER');
export const resetActiveLayers = createAction('LAYERS__RESET-ACTIVE-LAYERS');
export const setLoading = createAction('LAYERS__SET-LOADING');
export const setError = createAction('LAYERS__SET-ERRORS');
export const clearLayers = createAction('LAYERS__CLEAR-LAYERS');

export const fetchLayers = createThunkAction('LAYERS__FETCH-LAYERS', () =>
  (dispatch, getState) => {
    const { filters } = getState();
    const { hazard: hazardFilters } = filters;
    const queryParams = queryString.stringify({ ...hazardFilters });

    dispatch(setLoading(true));

    return fetch(`${process.env.WRI_API_URL}/v1/dataset/${FETCH_DATASET_ID}?includes=layer&${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(response => WRISerializer(response))
      .then(({ layer }) => {
        dispatch(setLoading(false));
        dispatch(setLayers(layer));
      })
      .catch((err) => {
        dispatch(setLoading(false));

        if (err && typeof err.json === 'function') {
          err.json()
            .then(({ errors }) => {
              dispatch(setError(errors));
            });
        } else {
          dispatch(setError(err.errors));
        }
      });
  })

export default {
  setLayers,
  setActiveLayer,
  deleteActiveLayer,
  resetActiveLayers,
  setLoading,
  setError,
  clearLayers,
  fetchLayers
};
