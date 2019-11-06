import { NOT_FOUND } from 'redux-first-router'
import queryString from 'query-string'

export const ROUTES_CONFIG = { 
  location: state => state.router,
  querySerializer: queryString
};

export const ROUTES = {
  home: '/:tab?',
  compare: '/compare/:tab?',
  'widget-preview': '/preview/:tab/widget/:id',
  'widget-embed': '/embed/:tab/widget/:id',
  [NOT_FOUND]: 'NotFound'
};

export default {
  ROUTES_CONFIG,
  ROUTES
};
