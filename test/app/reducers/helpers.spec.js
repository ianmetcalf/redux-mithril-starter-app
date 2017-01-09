import expect from 'expect';
import freeze from 'deep-freeze';

import {
  createReducer,
} from '../../../app/reducers/helpers';

const KNOWN_ACTION = 'KNOWN_ACTION';
const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
const UNDEFINED_ACTION = undefined;

describe('reducer helpers', function () {
  describe('#createReducer', function () {
    context('when called without action handlers', function () {
      it('throws missing action type error', function () {
        expect(() => createReducer()).toThrow(/no action types found/i);
      });
    });

    context('when called with invalid action type handler', function () {
      it('throws unexpected action type error', function () {
        expect(() => createReducer(null, {
          [UNDEFINED_ACTION]: (state, action) => state,
        })).toThrow(/unexpected action type found/i);
      });
    });

    context('when called with action handlers', function () {
      let initialState = null;
      let reducer = null;

      beforeEach('create reducer', function () {
        initialState = freeze([]);

        reducer = createReducer(initialState, {
          [KNOWN_ACTION]: (state, action) => [...state, action.payload],
        });
      });

      it('returns the initial state', function () {
        expect(reducer(undefined, {})).toBe(initialState);
      });

      it('handles action with known type', function () {
        const state = freeze(['some item']);

        const action = {
          type: KNOWN_ACTION,
          payload: 'other item',
        };

        expect(reducer(state, action)).toEqual(['some item', 'other item']);
      });

      it('ignores action with unknown type', function () {
        const state = freeze(['some item']);

        const action = {
          type: UNKNOWN_ACTION,
        };

        expect(reducer(state, action)).toEqual(state);
      });
    });

    context('when called with default action handler', function () {
      let reducer = null;

      beforeEach('create reducer', function () {
        const initialState = freeze([]);

        reducer = createReducer(initialState, {
          [KNOWN_ACTION]: (state, action) => [...state, action.payload],
          [createReducer.DEFAULT]: (state, action) => state.slice(1),
        });
      });

      it('handles action with known type', function () {
        const state = freeze(['some item']);

        const action = {
          type: KNOWN_ACTION,
          payload: 'other item',
        };

        expect(reducer(state, action)).toEqual(['some item', 'other item']);
      });

      it('handles action with unknown type', function () {
        const state = freeze(['some item']);

        const action = {
          type: UNKNOWN_ACTION,
        };

        expect(reducer(state, action)).toEqual([]);
      });
    });
  });
});
