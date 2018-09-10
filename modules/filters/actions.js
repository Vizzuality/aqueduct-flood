import { createAction } from 'redux-tools';

export const setCommonFilter = createAction('FILTERS__SET-COMMON-FILTER');
export const setRiskFilter = createAction('FILTERS__SET-RISK-FILTER');
export const setHazardFilter = createAction('FILTERS__SET-HAZARD-FILTER');
export const setCostFilter = createAction('FILTERS__SET-COST-FILTER');
export const clearFilters = createAction('FILTERS__CLEAR-FILTERS');

export default {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter,
  clearFilters
};
