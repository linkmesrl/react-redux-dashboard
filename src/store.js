import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import debounce from 'redux-localstorage-debounce';

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import pluginSaga from './sagas/pluginSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
  sagaMiddleware,
  routerMiddleware(browserHistory)
];

const reducer = compose(
  mergePersistedState()
)(rootReducer);

const storage = compose(
  debounce(500),
)(adapter(window.localStorage));

const enhancers = [
  applyMiddleware(...middlewares),
  persistState(storage, 'react-redux-dashboard')
];

const store = createStore(reducer, composeEnhancers(...enhancers));
sagaMiddleware.run(pluginSaga);

export default store;
