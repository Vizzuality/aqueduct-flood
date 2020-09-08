import { createSelector } from 'reselect';

// selectors
import { parseLocations, parseCompareLocations } from 'modules/locations/selectors';

// constants
import { SCENARIOS_OPTIONS } from 'constants/app';

const advancedSettings = state => state.filters.risk.advanced_settings;
const floodType = state => state.filters.risk.flood;

export const getFilteredLocations = createSelector([parseLocations, floodType],
  (_locations, _floodType) => {

  if (_floodType === 'Coastal') return _locations.filter(locationGroup => locationGroup.label !== 'Basins');

  return _locations;
});

export const getFilteredCompareLocations = createSelector([parseCompareLocations, floodType],
  (_locations, _floodType) => {

  if (_floodType === 'Coastal') return _locations.filter(locationGroup => locationGroup.label !== 'Basins');

  return _locations;
});

export const getScenarios = createSelector(
  [advancedSettings],
  (_advancedSettings) => _advancedSettings ? SCENARIOS_OPTIONS : [SCENARIOS_OPTIONS[0]]
);

export default {
  getFilteredLocations,
  getFilteredCompareLocations,
  getScenarios
};
