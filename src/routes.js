import { NOT_FOUND } from 'redux-first-router'
import queryString from 'query-string'

export const ROUTES_CONFIG = { 
  location: state => state.router,
  querySerializer: queryString
};

const directory = process.env.REACT_APP_PROD_PATH || '/';

export const ROUTES = {
  home: `${directory}:tab?`,
  compare: `${directory}compare/:tab?`,
  'widget-preview': `${directory}preview/:tab/widget/:id`,
  'cba-embed': `${directory}embed/cba`,
  'cba-embed-compare': `${directory}embed/cba/compare`,
  'widget-embed': `${directory}embed/:tab/widget/:id`,
  [NOT_FOUND]: 'NotFound'
};

export default {
  ROUTES_CONFIG,
  ROUTES
};
