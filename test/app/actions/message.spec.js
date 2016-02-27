import expect from 'expect';
import {ADD_MESSAGE, REMOVE_MESSAGE, RESET_MESSAGES} from '../../../app/actions/constants';
import {addMessage, removeMessage, resetMessages} from '../../../app/actions/message';

describe('message actions', function () {
  describe('#addMessage', function () {
    context('when called without body', function () {
      it('throws missing body error', function () {
        expect(() => addMessage()).toThrow(/must specify a body/i);
      });
    });

    context('when called with empty body', function () {
      it('throws missing message error', function () {
        expect(() => addMessage({body: ''})).toThrow(/must specify a body/i);
      });
    });

    context('when called with body', function () {
      it('creates ADD_MESSAGE action with body', function () {
        expect(addMessage({body: 'Some message'})).toEqual({
          type: ADD_MESSAGE,
          payload: {
            body: 'Some message',
            type: 'success',
          },
        });
      });
    });

    context('when called with type', function () {
      it('creates ADD_MESSAGE action with type', function () {
        expect(addMessage({body: 'Some message', type: 'error'})).toEqual({
          type: ADD_MESSAGE,
          payload: {
            body: 'Some message',
            type: 'error',
          },
        });
      });
    });

    context('when called with additional props', function () {
      it('creates ADD_MESSAGE action with prop', function () {
        expect(addMessage({body: 'Some message', prop: 'some prop'})).toEqual({
          type: ADD_MESSAGE,
          payload: {
            body: 'Some message',
            type: 'success',
            prop: 'some prop',
          },
        });
      });
    });
  });

  describe('#removeMessage', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        expect(() => removeMessage()).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('creats REMOVE_MESSAGE action', function () {
        expect(removeMessage(1)).toEqual({
          type: REMOVE_MESSAGE,
          payload: {
            id: 1,
          },
        });
      });
    });
  });

  describe('#resetMessages', function () {
    it('creats RESET_MESSAGES action', function () {
      expect(resetMessages()).toEqual({
        type: RESET_MESSAGES,
      });
    });
  });
});
