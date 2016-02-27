import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/pending';

describe('pending reducer', function () {
  const SOME_ACTION = 'SOME_ACTION';

  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('handles pending action', function () {
    const state = freeze([
      {id: 'GET /api/users'},
    ]);

    const action = {
      type: SOME_ACTION,
      meta: {
        pending: {
          id: 'POST /api/teams',
        },
      },
    };

    expect(reducer(state, action)).toEqual([
      {id: 'GET /api/users'},
      {id: 'POST /api/teams'},
    ]);
  });

  it('handles completed action', function () {
    const state = freeze([
      {id: 'GET /api/users'},
      {id: 'POST /api/teams'},
    ]);

    const action = {
      type: SOME_ACTION,
      meta: {
        pending: {
          id: 'POST /api/teams',
          completed: true,
        },
      },
    };

    expect(reducer(state, action)).toEqual([
      {id: 'GET /api/users'},
    ]);
  });


  it('ignores nonpending action', function () {
    const state = freeze([
      {id: 'GET /api/users'},
    ]);

    const action = {
      type: SOME_ACTION,
      meta: {
        prop: 'Some prop',
      },
    };

    expect(reducer(state, action)).toEqual(state);
  });
});
