import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { handleModule } from 'redux-tools';

// third-party reducers
import { loadingBarReducer } from 'react-redux-loading-bar';

// modules
import * as appModule from 'modules/app';
import * as locationsModule from 'modules/locations';
import * as mapModule from 'modules/map';
import * as hazardLegendModule from 'components/ui/map/legend';
import * as layersModule from 'modules/layers';
import * as widgetsModule from 'modules/widgets';
import * as widgetsCompareModule from 'modules/widgets-compare';
import * as filtersModule from 'modules/filters';
import * as filtersCompareModule from 'modules/filters-compare';

const reducer = combineReducers({
  // Global
  loadingBar: loadingBarReducer,

  app: handleModule(appModule),
  locations: handleModule(locationsModule),
  map: handleModule(mapModule),
  hazardLegend: handleModule(hazardLegendModule),
  layers: handleModule(layersModule),
  widgets: handleModule(widgetsModule),
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
    /* The router middleware MUST be before thunk otherwise the URL changes
      * inside a thunk function won't work properly */
    applyMiddleware(thunk),
  ),
);

export default initStore;
