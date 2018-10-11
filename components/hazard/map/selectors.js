import { createSelector } from 'reselect';

// mockup
import HAZARD_LAYERS_MOCKUP from 'data/hazard-layers';

const layers = state => state.layers.list;
const getActiveLayer = state => state.layers.activeLayers;
const getFloodFilter = state => state.filters.hazard.flood;

export const updatedLayers = createSelector(
  [layers, getActiveLayer, getFloodFilter],
  (_layers, _activeLayers, floodFilter) => {
    const layerIds = HAZARD_LAYERS_MOCKUP[floodFilter];

    return _layers
      .filter(_layer => layerIds.includes(_layer.id))
      .map((_l) => ({
        ..._l,
        ..._activeLayers.includes(_l.id) && { active: true }
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
  (_updatedLayers) => _updatedLayers.filter(_layer => _layer.active)
);

export default {
  updatedLayers,
  getActiveLayers
};
