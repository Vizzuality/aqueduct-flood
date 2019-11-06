import { Base64 } from 'js-base64';
import { createAction, createThunkAction } from 'redux-tools';

// actions
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';
import {
  setCommonCompareFilter,
  setRiskCompareFilter,
  setHazardCompareFilter,
  setCostCompareFilter,
} from 'modules/filters-compare/actions';
import { setActiveLayer } from "modules/layers/actions";
import { setMapOptions } from "modules/map/actions";
import { setReturnPeriod } from 'components/hazard/map/legend/actions';
import { setExistingProt, setProtFut, setExistingProtCompare, setProtFutCompare } from 'modules/widget-map/actions';

export const setTab = createAction('APP__SET-TAB');
export const setSidebarVisibility = createAction('APP__SET-SIDEBAR-VISIBILITY');
export const applyFilters = createAction('APP__APPLY-FILTERS');
export const setModal = createAction('APP__SET-MODAL');
export const resetModal = createAction('APP__RESET-MODAL');
export const setInput = createAction('APP__SET-INPUT');
export const clearInput = createAction('APP__CLEAR-INPUT');
export const setInputCompare = createAction('APP__SET-INPUT-COMPARE');
export const clearInputCompare = createAction('APP__CLEAR-INPUT-COMPARE');
export const setIsNullTime = createAction('APP__SET-IS-NULL-TIME');
export const setRouter = (type, payload) => {
  return {
    type,
    payload
  };
 }

export const setParamsFromURL = createThunkAction('APP__SET-PARAMS-FROM-URL', (params) =>
  (dispatch, getState) => {
    if (!params) return null;
    const { router: { type } } = getState();
    const decodedParams = JSON.parse(Base64.decode(params));

    if (type === 'home') {
      const {
        common,
        risk,
        hazard,
        cba,
        activeLayers,
        map
      } = decodedParams;

      dispatch(setCommonFilter(common));
      dispatch(setRiskFilter(risk));
      dispatch(setHazardFilter(hazard));
      dispatch(setCostFilter(cba));
      dispatch(setMapOptions({ ...map }));
  
      if (cba.existing_prot) {
        dispatch(setIsNullTime(false));
        dispatch(setExistingProt(cba.existing_prot));
      }
  
      if (cba.prot_fut) dispatch(setProtFut(cba.prot_fut));
  
      if (map.returnPeriod) dispatch(setReturnPeriod(map.returnPeriod));
  
      if (activeLayers) dispatch(setActiveLayer(activeLayers));
    }
    
    if (type === 'compare') {
      const { filters, filtersCompare } = decodedParams;
      const { common, risk, hazard, cba } = filters;
      const {
        common: commonCompare,
        risk: riskCompare,
        hazard: hazardCompare,
        cba: cbaCompare
      } = filtersCompare;

      // filters
      setCommonFilter(common);
      setRiskFilter(risk);
      setHazardFilter(hazard);
      setCostFilter(cba);

      // compare filters
      setCommonCompareFilter(commonCompare);
      setRiskCompareFilter(riskCompare);
      setHazardCompareFilter(hazardCompare);
      setCostCompareFilter(cbaCompare);

      if (cba.existing_prot) setExistingProt(cba.existing_prot);
      if (cba.prot_fut) setProtFut(cba.prot_fut);

      if (cbaCompare.existing_prot) setExistingProtCompare(cbaCompare.existing_prot);
      if (cbaCompare.prot_fut) setProtFutCompare(cbaCompare.prot_fut);
    }

  })

export default {
  setTab,
  setSidebarVisibility,
  applyFilters,
  setModal,
  resetModal,
  setInput,
  clearInput,
  setInputCompare,
  clearInputCompare,
  setIsNullTime,
  setParamsFromURL
};
