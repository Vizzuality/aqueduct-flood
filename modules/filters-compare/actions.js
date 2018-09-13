import { createAction } from 'redux-tools';

export const setCommonCompareFilter = createAction('FILTERS-COMPARE__SET-COMMON-FILTER');
export const setRiskCompareFilter = createAction('FILTERS-COMPARE__SET-RISK-FILTER');
export const setHazardCompareFilter = createAction('FILTERS-COMPARE__SET-HAZARD-FILTER');
export const setCostCompareFilter = createAction('FILTERS-COMPARE__SET-COST-FILTER');
export const clearCompareFilters = createAction('FILTERS-COMPARE__CLEAR-FILTERS');

export default {
  setCommonCompareFilter,
  setRiskCompareFilter,
  setHazardCompareFilter,
  setCostCompareFilter,
  clearCompareFilters
};
