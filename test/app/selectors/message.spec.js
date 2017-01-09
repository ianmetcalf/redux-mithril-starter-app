import expect from 'expect';
import freeze from 'deep-freeze';

import {
  getMessages,
  getMessagesWhere,
  getMessageById,
} from '../../../app/selectors/message';

describe('message selectors', function () {
  describe('#getMessages', function () {
    it('returns the list of messages', function () {
      const state = freeze({
        messages: [
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
        ],
      });

      expect(getMessages(state)).toEqual([
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
    });
  });

  describe('#getMessagesWhere', function () {
    context('when called without criteria', function () {
      it('returns all messages', function () {
        const state = freeze({
          messages: [
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
          ],
        });

        expect(getMessagesWhere(state)).toEqual([
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
      });
    });

    context('when called with criteria', function () {
      it('returns messages that match', function () {
        const state = freeze({
          messages: [
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
          ],
        });

        expect(getMessagesWhere(state, {type: 'success'})).toEqual([
          {
            id: 1,
            body: 'Some message',
            type: 'success',
          },
        ]);
      });
    });
  });

  describe('#getMessageById', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          messages: [],
        });

        expect(() => getMessageById(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns the message if it exists', function () {
        const state = freeze({
          messages: [
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
          ],
        });

        expect(getMessageById(state, 1)).toEqual({
          id: 1,
          body: 'Some message',
          type: 'success',
        });
      });

      it('returns null if message does not exist', function () {
        const state = freeze({
          messages: [],
        });

        expect(getMessageById(state, 1)).toEqual(null);
      });
    });
  });
});
