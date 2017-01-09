import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/requests';

const SOME_ACTION = 'SOME_ACTION';

describe('requests reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('handles action with pending request', function () {
    const state = freeze({});

    const action = {
      type: SOME_ACTION,
      meta: {
        request: {
          id: 'GET /api/users',
          pending: true,
        },
      },
    };

    expect(reducer(state, action)).toEqual({
      'GET /api/users': {
        pending: true,
        completed: false,
      },
    });
  });

  it('handles action with completed request', function () {
    const state = freeze({
      'GET /api/users': {
        pending: true,
        completed: false,
      },
    });

    const action = {
      type: SOME_ACTION,
      meta: {
        request: {
          id: 'GET /api/users',
          completed: true,
        },
      },
    };

    expect(reducer(state, action)).toEqual({
      'GET /api/users': {
        pending: false,
        completed: true,
      },
    });
  });

  it('ignores action with request', function () {
    const state = freeze({});

    const action = {
      type: SOME_ACTION,
      meta: {
        prop: 'Some prop',
      },
    };

    expect(reducer(state, action)).toEqual(state);
  });
});
