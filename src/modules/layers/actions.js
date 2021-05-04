// src/modules/layers/actions.js floods

import { createAction, createThunkAction } from 'redux-tools';
// import WRISerializer from 'wri-json-api-serializer'; // this is from the npm package
import * as queryString from 'query-string';
import WRISerializer from '../../constants/serializer' // I added this to src/constants so we could mess with it

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

export const fetchLayer = (layerId, datasetId) =>
  fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${datasetId}/layer/${layerId}`, {})
    .then((response) => {
      if (response.ok) return response.json();
      throw response;
    })
    .then(response => WRISerializer(response));

export const fetchLayers = createThunkAction('LAYERS__FETCH-HAZARD-LAYERS', () =>
  (dispatch, getState) => {
    const { filters, layers } = getState();
    const { hazard: hazardFilters } = filters;
    const { activeLayers } = layers;

    const uniqueVocabulary = getUniqueVocabulary(hazardFilters);
    const queryParams = queryString.stringify({ aqueductfloods: uniqueVocabulary });

    dispatch(setLoading(true));
// Some things to try with the query below:
// /layer?name=inunriver
// /layer
// /layer?page[size]=100
    // Original:
    // return fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${FETCH_HAZARD_DATASET_ID}/layer/vocabulary/find?${queryParams}`, {})
    // return fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${FETCH_HAZARD_DATASET_ID}/layer?page[size]=700`, {})
    return fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${FETCH_HAZARD_DATASET_ID}/layer?name=inuncoast_historical_nosub_hist_rp&page[size]=50`)
    // return fetch(`${process.env.REACT_APP_WRI_API_URL}/v1/dataset/${FETCH_HAZARD_DATASET_ID}/layer?name=inuncoast_historical_wtsub_2030&page[size]=50`)
      .then((response) => {
        console.log(queryParams) // aqueductfloods=hazards_inunriver_2010.0_historical_000000000WATCH_None_None (for default settings--these are getting set with different parameters when you change the settings, responses have layers associated with them)
        if (response.ok) return response.json();
        throw response;
      })
      // The serializer is an npm package: https://www.npmjs.com/package/wri-json-api-serializer, https://github.com/resource-watch/wri-json-api-serializer
      // it looks like the serializer might be broken? See console.log statements in original code.
      // ====Original plus console.log statements:
      .then(response => {
        console.log("RESPONSE:");
        console.log(response);
        console.log("Serialized response");
        console.log(WRISerializer(response)); // as expected
        return WRISerializer(response);
      })
      .then(data => {
        console.log("DATA");
        console.log(data); // 404s using queryParams, using all layers the app loads, but it isn't correct--it's the same no matter what you select
        const layerIds = ((data[0] || {}).resources || []).map(_layer => _layer.id);
        const promises = layerIds.map(_layerId => fetchLayer(_layerId, FETCH_HAZARD_DATASET_ID));
      //==== end original

      // +++++Our code: using this code, the flood magnitude selector in the bottom right loads--doesn't load using serializer
      // .then(response => response.data)
      // .then((data = []) => {
      //   console.log(data)
      //   const layerIds = data.map(_layer => _layer.id);
      //   const promises = layerIds.map(_layerId => fetchLayer(_layerId, FETCH_HAZARD_DATASET_ID));
      // +++++end our code
      // })

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
