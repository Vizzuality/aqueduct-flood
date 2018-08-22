import { createAction } from 'redux-tools';

export const setTab = createAction('APP__SET-TAB');
export const setSidebarVisibility = createAction('APP__SET-SIDEBAR-VISIBILITY');
export const applyFilters = createAction('APP__APPLY-FILTERS');
export const setModal = createAction('APP__SET-MODAL');
export const resetModal = createAction('APP__RESET-MODAL');

export default {
  setTab,
  setSidebarVisibility,
  applyFilters,
  setModal,
  resetModal
};
