import { createSelector } from 'reselect';

// utils
import { calculateClosesPeriodRange } from 'utils/cba';

const getLayers = (state, _layers) => _layers;
const getReturnPeriod = state => state.filters.cba.existing_prot;
const getFutureReturnPeriod = state => state.filters.cba.prot_fut;
const getReturnPeriodCompare = state => state.filtersCompare.cba.existing_prot;
const getFutureReturnPeriodCompare = state => state.filtersCompare.cba.prot_fut;

export const getLeftLayers = createSelector(
  [getLayers, getReturnPeriod],
  (_layers = [], _returnPeriod) => {
    if (!_layers.length) return _layers;
    const closestPeriodRange = calculateClosesPeriodRange(_returnPeriod);
    const indexCurrentPeriod = _layers.findIndex(_layer => _layer.slug.includes(closestPeriodRange));

    return _layers
      .slice(indexCurrentPeriod)
      .map(_layer => ({
        ..._layer,
        active: true
      }));
  }
);

export const getRightLayers = createSelector(
  [getLayers, getFutureReturnPeriod],
  (_layers = [], _returnPeriod) => {
    if (!_layers.length) return _layers;

    const indexCurrentPeriod = _layers.findIndex(_layer => _layer.slug.includes(_returnPeriod));

    return _layers
      .slice(indexCurrentPeriod)
      .map(_layer => ({
        ..._layer,
        active: true
      }));
  }
);

export const getLeftLayersCompare = createSelector(
  [getLayers, getReturnPeriodCompare],
  (_layers = [], _returnPeriod) => {
    if (!_layers.length) return _layers;
    const closestPeriodRange = calculateClosesPeriodRange(_returnPeriod);
    const indexCurrentPeriod = _layers.findIndex(_layer => _layer.slug.includes(closestPeriodRange));

    return _layers
      .slice(indexCurrentPeriod)
      .map(_layer => ({
        ..._layer,
        active: true
      }));
  }
);

export const getRightLayersCompare = createSelector(
  [getLayers, getFutureReturnPeriodCompare],
  (_layers = [], _returnPeriod) => {
    if (!_layers.length) return _layers;

    const indexCurrentPeriod = _layers.findIndex(_layer => _layer.slug.includes(_returnPeriod));

    return _layers
      .slice(indexCurrentPeriod)
      .map(_layer => ({
        ..._layer,
        active: true
      }));
  }
);

export default {
  getLeftLayers,
  getRightLayers,

  getLeftLayersCompare,
  getRightLayersCompare
};
