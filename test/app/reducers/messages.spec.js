import expect from 'expect';
import freeze from 'deep-freeze';
import {ADD_MESSAGE, REMOVE_MESSAGE, RESET_MESSAGES} from '../../../app/actions';
import reducer from '../../../app/reducers/messages';

describe('messages reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual([]);
  });

  context('when called with ADD_MESSAGE action', function () {
    it('adds message', function () {
      const state = freeze([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
      ]);

      const action = {
        type: ADD_MESSAGE,
        payload: {
          body: 'Some other message',
          type: 'error',
          prop: 'some prop',
        },
      };

      expect(reducer(state, action)).toEqual([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
        {
          id: 2,
          body: 'Some other message',
          type: 'error',
          prop: 'some prop',
        },
      ]);
    });
  });

  context('when called with REMOVE_MESSAGE action', function () {
    it('removes the message if it exists', function () {
      const state = freeze([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
        {
          id: 2,
          body: 'Some other message',
          type: 'error',
        },
      ]);

      const action = {
        type: REMOVE_MESSAGE,
        payload: {
          id: 2,
        },
      };

      expect(reducer(state, action)).toEqual([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
      ]);
    });

    it('ignores action if message does not exist', function () {
      const state = freeze([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
      ]);

      const action = {
        type: REMOVE_MESSAGE,
        payload: {
          id: 2,
        },
      };

      expect(reducer(state, action)).toEqual(state);
    });
  });

  context('when called with RESET_MESSAGES action', function () {
    it('removes all messages', function () {
      const state = freeze([
        {
          id: 1,
          body: 'Some message',
          type: 'success',
        },
        {
          id: 2,
          body: 'Some other message',
          type: 'error',
        },
      ]);

      const action = {
        type: RESET_MESSAGES,
      };

      expect(reducer(state, action)).toEqual([]);
    });
  });
});
