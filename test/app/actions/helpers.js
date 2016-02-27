import expect from 'expect';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export const createThunkStore = applyMiddleware(thunkMiddleware)((...args) => {
  const store = createStore(...args);

  store._dispatch = expect.spyOn(store, 'dispatch');

  return store;
});
