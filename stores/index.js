import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from 'Reducers';

const reducers = combineReducers();
let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  middleware = [...middleware, logger];
}

const store = createStore(
    reducers,
    applyMiddleware(...middleware),
  ),
  isServer = typeof window === 'undefined',
  __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export function initializeStore (initialState = {}) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware),
  );
}

export function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default store;
