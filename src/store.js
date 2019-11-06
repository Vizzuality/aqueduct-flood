import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { handleModule } from 'redux-tools';
import { connectRoutes } from 'redux-first-router'

// third-party reducers
import { loadingBarReducer } from 'react-redux-loading-bar';

// modules
import * as appModule from 'modules/app';
import * as locationsModule from 'modules/locations';
import * as mapModule from 'modules/map';
import * as hazardLegendModule from 'components/hazard/map/legend';
import * as layersModule from 'modules/layers';
import * as widgetsModule from 'modules/widgets';
import * as widgetMapModule from 'modules/widget-map';
import * as widgetsCompareModule from 'modules/widgets-compare';
import * as filtersModule from 'modules/filters';
import * as filtersCompareModule from 'modules/filters-compare';

// routes
import { ROUTES, ROUTES_CONFIG } from './routes';

const { 
  reducer: routesReducer, 
  middleware: routesMiddleware, 
  enhancer: routesEnhancer
} = connectRoutes(ROUTES, ROUTES_CONFIG);

const reducer = combineReducers({
  // global
  loadingBar: loadingBarReducer,
  router: routesReducer,

  app: handleModule(appModule),
  locations: handleModule(locationsModule),
  map: handleModule(mapModule),
  hazardLegend: handleModule(hazardLegendModule),
  layers: handleModule(layersModule),
  widgets: handleModule(widgetsModule),
  widgetMap: handleModule(widgetMapModule),
  widgetsCompare: handleModule(widgetsCompareModule),
  filters: handleModule(filtersModule),
  filtersCompare: handleModule(filtersCompareModule)
});

const initStore = (initialState = {}) => createStore(
  reducer,
  initialState,
  /* Redux dev tool, install chrome extension in
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
  composeWithDevTools(
    routesEnhancer,
    /* The router middleware MUST be before thunk otherwise the URL changes
      * inside a thunk function won't work properly */
    applyMiddleware(thunk, routesMiddleware),
  )
);

export default initStore;
