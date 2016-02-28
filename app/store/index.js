import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {mithrilMiddleware} from './middleware';
import rootReducer from '../reducers';

const middleware = [
  thunkMiddleware,
  createLogger(),
  mithrilMiddleware,
];

const enhancer = applyMiddleware(...middleware);

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
