import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureRoutes from './routing/configureRoutes';

export default store => {
  const history = syncHistoryWithStore(browserHistory, store);
  const routes = configureRoutes(store);

  return (
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>
  );
};
