import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import Page from 'pages';
import URLManager from 'components/url-manager';

// constants
import { URL_PROPS } from 'components/url-manager/constants';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Fragment>
        <URLManager urlProps={URL_PROPS} />
        <Page />
      </Fragment>
    </Provider>
  );
};

export default App;