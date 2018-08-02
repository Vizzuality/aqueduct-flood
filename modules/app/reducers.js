import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setTab]: (state, { payload }) => ({ ...state, tab: payload }),
  [actions.setSidebarVisibility]: (state, { payload }) => ({ ...state, sidebar: payload }),
  [actions.setModal]: (state, { payload }) => ({
    ...state,
    modal: {
      ...state.modal,
      ...payload
    }
  }),
  [actions.resetModal]: state => ({ ...state, modal: initialState.modal })
};
