import { Base64 } from 'js-base64';
import * as queryString from 'query-string';

const triggerDownload = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.click();
}

export const getCbaEmbedURL = ({ id }, filters) => `/embed/cba/widget/${id}?p=${Base64.encode(JSON.stringify(filters))}`;
export const getCbaPreviewURL = ({ id }, filters) => `/preview/cba/widget/${id}?p=${Base64.encode(JSON.stringify(filters))}`
export const generateCbaDownloadURL = ({ id }, filters, format) => {
  const { common, cba } = filters;
  const widgetParams = queryString.stringify({
    ...common,
    ...cba,
    ...{ discount_rate: cba.discount_rate / 100 },
    ...{ om_costs: cba.om_costs / 100 },
    ...{ user_urb_cost: cba.user_urb_cost || 'null' },
    ...{ user_rur_cost: 'null' },
    format
  });

  triggerDownload(`${process.env.REACT_APP_API_URL}/cba/widget/${id}?${widgetParams}`);
}

export const getRiskEmbedURL = ({ id }, filters) => `/embed/${filters.advanced_settings ? 'advanced_risk' : 'risk'}/widget/${id}?p=${Base64.encode(JSON.stringify(filters))}`;
export const getRiskPreviewURL = ({ id }, filters) => `/preview/${filters.advanced_settings ? 'advanced_risk' : 'risk'}/widget/${id}?p=${Base64.encode(JSON.stringify(filters))}`

export const generateRiskDownloadURL = ({ id }, filters, format) => {
  const { common, risk } = filters;
  const {
    advanced_settings: advancedSettings,
    estimated_costs: estimatedCosts,
    prot_fut: protFut,
    ...restRiskFilters
  } = risk;

  const {
    estimated_costs: estimatedCostsCommon,
    prot_fut: protFutCommon,
    ...restCommonParams
  } = common;

  const widgetParams = queryString.stringify({
    ...restCommonParams,
    ...restRiskFilters,
    format
  });

  triggerDownload(`${process.env.REACT_APP_API_URL}/risk/widget/${id}?${widgetParams}`);
}


export default {
  getCbaEmbedURL,
  getCbaPreviewURL,
  generateCbaDownloadURL,

  getRiskEmbedURL,
  getRiskPreviewURL,
  generateRiskDownloadURL
}
