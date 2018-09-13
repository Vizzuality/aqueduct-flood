import { createSelector } from 'reselect';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

const advancedSettingsCompare = state => state.filtersCompare.risk.advanced_settings;

export const getScenariosCompare = createSelector(
  [advancedSettingsCompare],
  (_advancedSettingsCompare) => _advancedSettingsCompare ? SCENARIOS_OPTIONS : [SCENARIOS_OPTIONS[0]]
);

export default { getScenariosCompare };
