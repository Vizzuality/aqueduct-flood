import { createSelector } from 'reselect';

const getLayers = state => state.layers.list;
const getReturnPeriod = state => state.hazardLegend.returnPeriod;

export const updatedLayers = createSelector(
  [getLayers, getReturnPeriod],
  (_layers, _returnPeriod) => {
    const indexCurrentPeriod = _layers.findIndex(_layer => _layer.slug.includes(_returnPeriod));

    return _layers
      .map((_l, index) => ({
        ..._l,
        ...index >= indexCurrentPeriod && { active: true }
      }))
      .sort((a, b) => {
        if (a.name === b.name) return 0;

        if (a.name > b.name) return 1;

        return -1;
      });
  }
);

export const getActiveLayers = createSelector(
  [updatedLayers],
  (_layers) => _layers.filter(_layer => _layer.active)
);

export default {
  updatedLayers,
  getActiveLayers
};
