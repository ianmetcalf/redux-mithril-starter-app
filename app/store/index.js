import m from 'mithril';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const middleware = [
  thunkMiddleware,
  createLogger(),
];

const enhancer = applyMiddleware(...middleware);

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  store.subscribe(m.redraw);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
