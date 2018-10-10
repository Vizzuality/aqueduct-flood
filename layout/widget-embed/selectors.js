import { createSelector } from 'reselect';

// constants
import { APP_TABS } from 'constants/app';

const nextTab = state => state.app.tab;

export const updatedTabs = createSelector(
  [nextTab],
  (_nextTab) => APP_TABS.map(_tab => ({
      ..._tab,
      default: _tab.value === _nextTab
    }))
);

export default { updatedTabs };
