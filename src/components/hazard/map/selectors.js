import { createSelector } from 'reselect';

// constants
import { BASEMAPS } from './constants';

const getLayers = state => state.layers.list;
const getBasemap = state => state.map.basemap;
const getReturnPeriod = state => state.hazardLegend.returnPeriod;

export const filterLayersByReturnPeriod = createSelector(
  [getLayers, getReturnPeriod],
  (_layers, _returnPeriod) => {
    if (!_layers.length) return _layers;

    return _layers
      .filter(_layer => _layer.slug.includes(_returnPeriod))
      .map((_l) => ({
        ..._l,
        active: true
      }));
  }
);

export const parseBasemap = createSelector(
  [getBasemap],
  (_basemap) => {
    const currentBasemap = BASEMAPS[_basemap] || {};
    const { id, value, options } = currentBasemap;

    return ({
      id,
      url: value,
      options
    });
  }
);

export default {
  filterLayersByReturnPeriod,
  parseBasemap
};
