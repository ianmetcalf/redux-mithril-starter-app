import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

let enhancer = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const {composeWithDevTools} = require('redux-devtools-extension');

  enhancer = composeWithDevTools(enhancer);
}

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
