import * as actions from './actions';

export default {
  [actions.setExistingProt]: (state, { payload }) => ({
    ...state,
    existing_prot: payload
  }),
  [actions.setProtFut]: (state, { payload }) => ({
    ...state,
    prot_fut: payload
  }),
  [actions.setExistingProtCompare]: (state, { payload }) => ({
    ...state,
    existing_prot_compare: payload
  }),
  [actions.setProtFutCompare]: (state, { payload }) => ({
    ...state,
    prot_fut_compare: payload
  })
};
