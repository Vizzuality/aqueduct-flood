import { createSelector } from 'reselect';

// constants
import { YEAR_OPTIONS } from 'constants/hazard';

const nextYear = state => state.filters.hazard.year;

export const updatedTimeline = createSelector(
  [nextYear],
  (_nextYear) => YEAR_OPTIONS.map(year => ({
      ...year,
      selected: year.value === _nextYear
    }))
);

export default { updatedTimeline };
