import { createAction } from 'redux-tools';

export const setFilter = createAction('FILTERS__SET-FILTER');
export const clearFilters = createAction('FILTERS__CLEAR-FILTERS');

export default {
  setFilter,
  clearFilters
};
