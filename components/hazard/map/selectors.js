import { createSelector } from 'reselect';

const getLayers = state => state.layers.list;
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

export default { filterLayersByReturnPeriod };
