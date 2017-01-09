import {assert} from 'expect';
import {isObject, isFunction, differenceWith, intersectionWith, flatten} from 'lodash';
import {isFSA} from 'flux-standard-action';
import tmatch from 'tmatch';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import freeze from 'deep-freeze';

export function withState(state) {
  this.state = state;
  return this;
}

export function toDispatchActions(expected = []) {
  assert(
    Array.isArray(expected) && expected.every(action => isObject(action) || isFunction(action)),
    'The "expected" argument in toDispatchActions(expected) must be an array of objects or functions',
  );

  assert(
    isObject(this.actual) || isFunction(this.actual),
    'The "actual" argument in expect(actual).toDispatchActions() must be an object or function',
  );

  return performAssertion((actualActions, expectedActions) => {
    const actions = differenceWith(expectedActions, actualActions, (e, a) => tmatch(a, e));

    assert(actions.length === 0, [
      `Expected ${ actions.length > 1 ? 'actions were' : 'action was' } never dispatched`,
      ...actions.map(action => JSON.stringify(action, null, '  ')),
    ].join('\n'));
  }, this.state || {}, this.actual, expected);
}

export function toDispatchAction(expected) {
  assert(
    isObject(expected) || isFunction(expected),
    'The "expected" argument in toDispatchAction(expected) must be an object or function',
  );

  return this.toDispatchActions([expected]);
}

export function toNotDispatchActions(expected = []) {
  assert(
    Array.isArray(expected) && expected.every(action => isObject(action) || isFunction(action)),
    'The "expected" argument in toNotDispatchActions(expected) must be an array of objects or functions',
  );

  assert(
    isObject(this.actual) || isFunction(this.actual),
    'The "actual" argument in expect(actual).toDispatchActions() must be an object or function',
  );

  return performAssertion((actualActions, unexpectedActions) => {
    let actions = actualActions;

    if (unexpectedActions.length) {
      actions = intersectionWith(unexpectedActions, actions, (e, a) => tmatch(a, e));
    }

    assert(actions.length === 0, [
      `Unexpected ${ actions.length > 1 ? 'actions were' : 'action was' } dispatched`,
      ...actions.map(action => JSON.stringify(action, null, '  ')),
    ].join('\n'));
  }, this.state || {}, this.actual, expected || []);
}

export function toNotDispatchAction(expected) {
  assert(
    isObject(expected) || isFunction(expected),
    'The "expected" argument in toNotDispatchAction(expected) must be an object or function',
  );

  return this.toNotDispatchActions([expected]);
}

export function toDispatchFSACompliantActions() {
  assert(
    isObject(this.actual) || isFunction(this.actual),
    'The "actual" argument in expect(actual).toDispatchFSACompliantActions() must be an object or function',
  );

  return performAssertion(actions => {
    actions.forEach(action => {
      assert(
        isFSA(action),
        `Expected action to be FSA complient\n${ JSON.stringify(action, null, '  ') }`,
      );
    });
  }, this.state || {}, this.actual);
}

function performAssertion(fn, initialState, actualAction, expectedActions = []) {
  const actions = [actualAction, ...expectedActions];

  return Promise.all(actions.map(action => getDispatchedActions(initialState, action)))
  .then(([actual, ...expected]) => fn(actual, flatten(expected)));
}

const storeFactory = configureStore([thunkMiddleware]);

function getDispatchedActions(initialState, action) {
  const store = storeFactory(freeze(initialState));

  return Promise.resolve()
  .then(() => store.dispatch(action))
  .then(() => store.getActions());
}
