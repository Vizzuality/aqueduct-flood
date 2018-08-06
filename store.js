import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { handleModule } from 'redux-tools';

// third-party reducers
import { loadingBarReducer } from 'react-redux-loading-bar';

// modules
import * as appModule from 'modules/app';
import * as routesModule from 'modules/routes';
import * as locationsModule from 'modules/locations';
import * as widgetsModule from 'modules/widgets';
import * as filtersModule from 'modules/filters';
import * as filtersCompareModule from 'modules/filters-compare';

const reducer = combineReducers({
  // Global
  loadingBar: loadingBarReducer,

  app: handleModule(appModule),
  routes: handleModule(routesModule),
  locations: handleModule(locationsModule),
  widgets: handleModule(widgetsModule),
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
