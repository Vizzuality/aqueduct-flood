import get from 'lodash/get';
import { Base64 } from 'js-base64';

import { createSelector } from 'reselect';

const state = state => state;
const filters = state => state.filters;
const filtersCompare = state => state.filtersCompare;
const activeLayers = state => state.layers.activeLayers;
const map = state => state.map;
const hazardLegend = state => state.hazardLegend;
const router = (state) => state.router;

const urlProps = (state, props) => props.urlProps || [];

export const getUrlFromParams = createSelector(
  [urlProps, state], (_urlProps, _state) => {
  return _urlProps.reduce((acc, current) => {
    const value = get(_state, current.redux);

    return {
      ...acc,
      [current.value]: value
    }
  }, {})
  }
)

export const getParamsFromUrl = createSelector(
  [urlProps, state], (_urlProps, _state) => {
    return _urlProps.reduce((acc, current) => {
      const { type } = current;
      const { router } = _state;
      const { query = {} } = router;

      const value = query[current.value];

      if (type === 'array') {
        const val = value || []

        return {
          ...acc,
          [current.value]: Array.isArray(val) ? val : [val]
        }
      }

      return {
        ...acc,
        [current.value]: value
      }
    }, {})
})

export const getUrl = createSelector(
  [router, filters, filtersCompare, activeLayers, map, hazardLegend, urlProps, getUrlFromParams], 
  (_router, _filters, _filtersCompare, _activeLayers, _map, _hazardLegend, _urlProps, _urlParams) => {
    const { pathname, type } = _router;
    let encodedParams = null;

    if (type === 'home' || type === 'cba-embed') {
      encodedParams = Base64.encode(JSON.stringify({
        ..._filters,
        activeLayers: _activeLayers,
        map: {
          ..._map,
          ..._hazardLegend
        }
      }))
    }

    if (type === 'compare' || type === 'cba-embed-compare') {
      encodedParams = Base64.encode(JSON.stringify({
        filters: _filters,
        filtersCompare: _filtersCompare
      }));
    }

    return `${pathname}${encodedParams ? `?p=${encodedParams}`: null}`;
    }
  );

export default { getUrl };