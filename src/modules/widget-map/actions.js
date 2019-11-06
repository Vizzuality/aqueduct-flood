import { createAction } from 'redux-tools';

// actions
export const setExistingProt = createAction('WIDGET-MAP/SET-EXISTING-PROT');
export const setProtFut = createAction('WIDGET-MAP/SET-PROT-FUT');
export const setExistingProtCompare = createAction('WIDGET-MAP/SET-EXISTING-PROT-COMPARE');
export const setProtFutCompare = createAction('WIDGET-MAP/SET-PROT-FUT-COMPARE');

export default {
  setExistingProt,
  setProtFut,
  setExistingProtCompare,
  setProtFutCompare
};
