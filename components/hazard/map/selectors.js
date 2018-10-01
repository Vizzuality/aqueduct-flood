import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

import { FETCH_DATASET_ID } from 'constants/hazard'

const layers = state => state.layers.list;
const activeLayer = state => state.layers.activeLayer;

export const updatedLayers = createSelector(
  [layers, activeLayer],
  (_layers, _activeLayer) =>_layers.map(_l => ({
      ..._l,
      ..._l.id === _activeLayer && { active: true }
    }))
);

export const sortedUpdatedLayers = createSelector(
  [updatedLayers],
  _layers => sortBy(_layers, l => l.active)
);

export const getLayerGroups = createSelector(
  [updatedLayers],
  (_layers) => [{
    dataset: FETCH_DATASET_ID,
    visibility: true,
    layers: _layers
  }]
);

export default {
  updatedLayers,
  sortedUpdatedLayers,
  getLayerGroups
};
