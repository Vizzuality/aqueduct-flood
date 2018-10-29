import { createAction, createThunkAction } from 'redux-tools';
import WRISerializer from 'wri-json-api-serializer';
import * as queryString from 'query-string';

// utils
import { getUniqueVocabulary } from 'utils/hazard';

// constants
import { FETCH_HAZARD_DATASET_ID } from 'constants/hazard';

export const setLayers = createAction('LAYERS__SET-LAYERS');
export const setActiveLayer = createAction('LAYERS__SET-ACTIVE-LAYER');
export const deleteActiveLayer = createAction('LAYERS__DELETE-ACTIVE-LAYER');
export const resetActiveLayers = createAction('LAYERS__RESET-ACTIVE-LAYERS');
export const setLoading = createAction('LAYERS__SET-LOADING');
export const setError = createAction('LAYERS__SET-ERRORS');
export const clearLayers = createAction('LAYERS__CLEAR-LAYERS');

export const fetchLayer = (layerId, datasetId) => {
  return fetch(`${process.env.WRI_API_URL}/v1/dataset/${datasetId}/layer/${layerId}`, {})
    .then((response) => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(response => WRISerializer(response))
}

export const fetchLayers = createThunkAction('LAYERS__FETCH-HAZARD-LAYERS', () =>
  (dispatch, getState) => {
    const { filters, layers } = getState();
    const { hazard: hazardFilters } = filters;
    const { activeLayers } = layers;

    const uniqueVocabulary = getUniqueVocabulary(hazardFilters);
    const queryParams = queryString.stringify({ aqueductfloods: uniqueVocabulary });

    dispatch(setLoading(true));

    return fetch(`${process.env.WRI_API_URL}/v1/dataset/${FETCH_HAZARD_DATASET_ID}/layer/vocabulary/find?${queryParams}`, {})
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(response => WRISerializer(response))
      .then((data = []) => {
        const layerIds = ((data[0] || {}).resources || []).map(_layer => _layer.id);
        const promises = layerIds.map(_layerId => fetchLayer(_layerId, FETCH_HAZARD_DATASET_ID));

        Promise.all(promises)
          .then((_layers => {
            dispatch(setLoading(false));
            if (!activeLayers.length) dispatch(setActiveLayer(layerIds));
            dispatch(setLayers(_layers));
          }))
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
