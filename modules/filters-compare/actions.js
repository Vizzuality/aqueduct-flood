import { createAction } from 'redux-tools';

export const setCompareFilter = createAction('FILTERS-COMPARE__SET-FILTER');
export const clearCompareFilters = createAction('FILTERS-COMPARE__CLEAR-FILTERS');

export default {
  setCompareFilter,
  clearCompareFilters
};
