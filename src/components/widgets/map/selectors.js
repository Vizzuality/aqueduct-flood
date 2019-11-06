import { createSelector } from 'reselect';

// utils
import { calculateClosestPeriodRange } from 'utils/cba';

const getLayers = (state) => {
  const { widgets } = state;
  const widget = widgets.find(_widget => _widget.id === 'inundation_map');

  return widget.data;
};
const getCompareLayers = (state) => {
  const { widgetsCompare } = state;
  const widget = widgetsCompare.find(_widget => _widget.id === 'inundation_map');

  return widget.data;
};
const getReturnPeriod = state => state.widgetMap.existing_prot;
const getFutureReturnPeriod = state => state.widgetMap.prot_fut;
const getReturnPeriodCompare = state => state.widgetMap.existing_prot_compare;
const getFutureReturnPeriodCompare = state => state.widgetMap.prot_fut_compare;

export const getLeftLayers = createSelector(
  [getLayers, getReturnPeriod],
  (data = {}, _returnPeriod) => {
    const { left: _layers = [] } = data;
    if (!_layers.length) return _layers;
    const closestPeriodRange = calculateClosestPeriodRange(_returnPeriod);
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
  (data = {}, _returnPeriod) => {
    const { right: _layers = [] } = data;
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
  [getCompareLayers, getReturnPeriodCompare],
  (data = {}, _returnPeriod) => {
    const { left: _layers = [] } = data;
    if (!_layers.length) return _layers;
    const closestPeriodRange = calculateClosestPeriodRange(_returnPeriod);
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
  [getCompareLayers, getFutureReturnPeriodCompare],
  (data = {}, _returnPeriod) => {
    const { left: _layers = [] } = data;
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
