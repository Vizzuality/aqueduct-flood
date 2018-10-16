import { createSelector } from 'reselect';

const layers = state => state.layers.list;
const getActiveLayer = state => state.layers.activeLayers;

export const updatedLayers = createSelector(
  [layers, getActiveLayer],
  (_layers, _activeLayers) =>
    _layers
      .map((_l) => ({
        ..._l,
        ..._activeLayers.includes(_l.id) && { active: true }
      }))
      .sort((a, b) => {
        if (a.name === b.name) return 0;

        if (a.name > b.name) return 1;

        return -1;
      })
    );

export const getActiveLayers = createSelector(
  [updatedLayers],
  (_updatedLayers) => _updatedLayers.filter(_layer => _layer.active)
);

export default {
  updatedLayers,
  getActiveLayers
};
