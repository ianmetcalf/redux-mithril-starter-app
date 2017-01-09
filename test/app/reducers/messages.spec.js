import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/messages';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  RESET_MESSAGES,
} from '../../../app/actions';

describe('messages reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual([]);
  });

  context('when called with show message action', function () {
    it('adds the message if it does not exist', function () {
      const state = freeze([]);

      const action = {
        type: SHOW_MESSAGE,
        payload: {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
      };

      expect(reducer(state, action)).toEqual([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
      ]);
    });

    it('replaces the message if it does exist', function () {
      const state = freeze([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
      ]);

      const action = {
        type: SHOW_MESSAGE,
        payload: {
          id: 'message_1',
          body: 'Some updated message',
          type: 'success',
        },
      };

      expect(reducer(state, action)).toEqual([
        {
          id: 'message_1',
          body: 'Some updated message',
          type: 'success',
        },
      ]);
    });
  });

  context('when called with clear message action', function () {
    it('removes the message if it exists', function () {
      const state = freeze([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
        {
          id: 'message_2',
          body: 'Some other message',
          type: 'error',
        },
      ]);

      const action = {
        type: CLEAR_MESSAGE,
        payload: {
          id: 'message_2',
        },
      };

      expect(reducer(state, action)).toEqual([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
      ]);
    });

    it('ignores action if message does not exist', function () {
      const state = freeze([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
      ]);

      const action = {
        type: CLEAR_MESSAGE,
        payload: {
          id: 'message_2',
        },
      };

      expect(reducer(state, action)).toEqual(state);
    });
  });

  context('when called with reset messages action', function () {
    it('removes all messages', function () {
      const state = freeze([
        {
          id: 'message_1',
          body: 'Some message',
          type: 'success',
        },
        {
          id: 'message_2',
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
