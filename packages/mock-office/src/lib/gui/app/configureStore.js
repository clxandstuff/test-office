import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const DEBUG = process.env.NODE_ENV !== 'production';

export default () => {
  const initialState = {};
  const routerMiddleware = createRouterMiddleware(browserHistory);
  const enhancer = compose(
    applyMiddleware(routerMiddleware, epicMiddleware),
    DEBUG && window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  return createStore(rootReducer, initialState, enhancer);
};
