import { createSelector } from 'reselect';

// constants
import { RETURN_PERIOD_OPTIONS } from './constants';

const nextTab = state => state.app.tab;
const getCurrentReturnPeriod = state => state.hazardLegend.returnPeriod;

export const updatedOptions = createSelector(
  [nextTab, getCurrentReturnPeriod],
  (_nextTab, _returnPeriod) => RETURN_PERIOD_OPTIONS.map(_option => ({
      ..._option,
      ..._option.value === _returnPeriod && { selected: true }
    }))
);

export default { updatedOptions };
