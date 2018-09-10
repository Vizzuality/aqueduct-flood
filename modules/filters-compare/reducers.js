import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setCommonCompareFilter]: (state, { payload }) => ({
    ...state,
    common: {
      ...state.common,
      ...payload
    }
  }),
  [actions.setRiskCompareFilter]: (state, { payload }) => ({
    ...state,
    risk: {
      ...state.risk,
      ...payload
    }
  }),
  [actions.setCostCompareFilter]: (state, { payload }) => ({
    ...state,
    cba: {
      ...state.cba,
      ...payload
    }
  }),
  [actions.setHazardCompareFilter]: (state, { payload }) => ({
    ...state,
    hazard: {
      ...state.hazard,
      ...payload
    }
  }),
  [actions.clearCompareFilters]: state => ({ ...state, ...initialState })
};
