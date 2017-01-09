import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/forms';

import {
  SET_FORM_FOCUS,
  SET_FORM_VALUES,
} from '../../../app/actions';

describe('forms reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual({});
  });

  context('when called with set focus action', function () {
    it('sets the form focus', function () {
      const state = freeze({
        'some form': {
          values: {
            prop: 'some prop',
          },
        },
      });

      const action = {
        type: SET_FORM_FOCUS,
        payload: {
          id: 'some form',
          focus: 'some-selector',
        },
      };

      expect(reducer(state, action)).toEqual({
        'some form': {
          focus: 'some-selector',
          values: {
            prop: 'some prop',
          },
        },
      });
    });
  });

  context('when called with set form action', function () {
    it('sets the form values', function () {
      const state = freeze({
        'some form': {
          focus: 'some-selector',
          values: {
            prop: 'some prop',
          },
        },
      });

      const action = {
        type: SET_FORM_VALUES,
        payload: {
          id: 'some form',
          values: {
            prop: 'some updated prop',
            other: 'some other prop',
          },
        },
      };

      expect(reducer(state, action)).toEqual({
        'some form': {
          focus: 'some-selector',
          values: {
            prop: 'some updated prop',
            other: 'some other prop',
          },
        },
      });
    });
  });
});
