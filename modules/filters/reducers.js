import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setCommonFilter]: (state, { payload }) => ({
    ...state,
    common: {
      ...state.common,
      ...payload
    }
  }),
  [actions.setRiskFilter]: (state, { payload }) => ({
    ...state,
    risk: {
      ...state.risk,
      ...payload
    }
  }),
  [actions.setCostFilter]: (state, { payload }) => ({
    ...state,
    cba: {
      ...state.cba,
      ...payload
    }
  }),
  [actions.setHazardFilter]: (state, { payload }) => ({
    ...state,
    hazard: {
      ...state.hazard,
      ...payload
    }
  }),
  [actions.clearFilters]: state => ({
    ...state,
    ...initialState,
    common: {
      ...initialState.common,
      geogunit_unique_name: null
    }
  })
};
