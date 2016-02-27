import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/entities';

describe('entities reducer', function () {
  const SOME_ACTION = 'SOME_ACTION';

  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('handles action with entities', function () {
    const state = freeze({
      users: {
        1: {
          id: 1,
          name: 'Some User',
          prop: 'some prop',
        },
      },
      teams: {
        1: {
          id: 1,
          name: 'Some Team',
        },
      },
    });

    const action = {
      type: SOME_ACTION,
      payload: {
        entities: {
          users: {
            1: {
              id: 1,
              name: 'Some User',
              teams: [2],
            },
          },
          teams: {
            2: {
              id: 2,
              name: 'Some Other Team',
              users: [1],
            },
          },
        },
      },
    };

    expect(reducer(state, action)).toEqual({
      users: {
        1: {
          id: 1,
          name: 'Some User',
          prop: 'some prop',
          teams: [2],
        },
      },
      teams: {
        1: {
          id: 1,
          name: 'Some Team',
        },
        2: {
          id: 2,
          name: 'Some Other Team',
          users: [1],
        },
      },
    });
  });

  it('ignores action with entities and errors', function () {
    const state = freeze({
      users: {
        1: {
          id: 1,
          name: 'Some User',
        },
      },
    });

    const action = {
      type: SOME_ACTION,
      error: true,
      payload: {
        entities: {
          teams: {
            1: {
              id: 1,
              name: 'Some Team',
            },
          },
        },
      },
    };

    expect(reducer(state, action)).toEqual(state);
  });

  it('ignores action without entities', function () {
    const state = freeze({
      users: {
        1: {
          id: 1,
          name: 'Some User',
        },
      },
    });

    const action = {
      type: SOME_ACTION,
      payload: {
        prop: 'some prop',
      },
    };

    expect(reducer(state, action)).toEqual(state);
  });
});
