import expect from 'expect';
import {createThunkStore} from './helpers';
import {SHOW_MESSAGE, CLEAR_MESSAGE, RESET_MESSAGES} from '../../../app/actions/constants';
import {showMessage, clearMessage, resetMessages} from '../../../app/actions/message';

describe('message actions', function () {
  describe('#showMessage', function () {
    let store = null;

    beforeEach('create store', function () {
      store = createThunkStore(state => state, {
        messages: [],
      });
    });

    context('when called without body', function () {
      it('throws missing body error', function () {
        expect(() => showMessage()).toThrow(/must specify a body/i);
      });
    });

    context('when called with empty body', function () {
      it('throws missing message error', function () {
        expect(() => showMessage({body: ''})).toThrow(/must specify a body/i);
      });
    });

    context('when called with body', function () {
      beforeEach('dispatch #showMessage() action', function () {
        return store.dispatch(showMessage({
          id: 'message_id',
          body: 'Some message',
        }));
      });

      it('creates SHOW_MESSAGE action with body', function () {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
            type: 'success',
          },
        });
      });
    });

    context('when called with type', function () {
      beforeEach('dispatch #showMessage() action', function () {
        return store.dispatch(showMessage({
          id: 'message_id',
          type: 'error',
          body: 'Some message',
        }));
      });

      it('creates SHOW_MESSAGE action with type', function () {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
            type: 'error',
          },
        });
      });
    });

    context('when called with additional props', function () {
      beforeEach('dispatch #showMessage() action', function () {
        return store.dispatch(showMessage({
          id: 'message_id',
          body: 'Some message',
          prop: 'some prop',
        }));
      });

      it('creates SHOW_MESSAGE action with prop', function () {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
            type: 'success',
            prop: 'some prop',
          },
        });
      });
    });

    context('when called without duration', function () {
      beforeEach('dispatch #showMessage() action', function () {
        return store.dispatch(showMessage({
          body: 'Some message',
        }));
      });

      it('does not clear the message', function () {
        expect(store._dispatch.calls.length).toEqual(1);
      });
    });

    context('when called with duration', function () {
      beforeEach('dispatch #showMessage() action', function () {
        return store.dispatch(showMessage({
          id: 'message_id',
          body: 'Some message',
          duration: 100,
        }));
      });

      it('creates SHOW_MESSAGE action', function () {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
            type: 'success',
          },
        });
      });

      it('creates CLEAR_MESSAGE action', function () {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: CLEAR_MESSAGE,
          payload: {
            id: 'message_id',
          },
        });
      });
    });
  });

  describe('#clearMessage', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        expect(() => clearMessage()).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('creats CLEAR_MESSAGE action', function () {
        expect(clearMessage('message_id')).toEqual({
          type: CLEAR_MESSAGE,
          payload: {
            id: 'message_id',
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
