import expect from 'expect';

import {
  showMessage,
  clearMessage,
  resetMessages,
} from '../../../app/actions/message';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  RESET_MESSAGES,
} from '../../../app/actions/constants';

describe('message actions', function () {
  describe('#showMessage', function () {
    context('when called without body', function () {
      it('throws missing body error', function () {
        return expect(() => showMessage()).toThrow(/must specify a body/i);
      });
    });

    context('when called with empty body', function () {
      it('throws missing message error', function () {
        return expect(() => showMessage({body: ''})).toThrow(/must specify a body/i);
      });
    });

    context('when called with body', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
        })).toDispatchAction({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(showMessage({
          body: 'Some message',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with type', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
          type: 'error',
        })).toDispatchAction({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
            type: 'error',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(showMessage({
          body: 'Some message',
          type: 'error',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with id', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          id: 'message_id',
          body: 'Some message',
        })).toDispatchAction({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(showMessage({
          id: 'message_id',
          body: 'Some message',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with additional props', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
          prop: 'some prop',
        })).toDispatchAction({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
            prop: 'some prop',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(showMessage({
          body: 'Some message',
          prop: 'some prop',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called without duration', function () {
      it('does not create clear message action', function () {
        return expect(showMessage({
          body: 'Some message',
        })).toNotDispatchAction({
          type: CLEAR_MESSAGE,
        });
      });
    });

    context('when called with duration', function () {
      it('creates clear message action', function () {
        return expect(showMessage({
          body: 'Some message',
          duration: 0.001,
        })).toDispatchAction({
          type: CLEAR_MESSAGE,
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(showMessage({
          body: 'Some message',
          duration: 0.001,
        })).toDispatchFSACompliantActions();
      });
    });
  });

  describe('#clearMessage', function () {
    context('when called without message', function () {
      it('throws missing message error', function () {
        return expect(() => clearMessage()).toThrow(/must specify a message/i);
      });
    });

    context('when called with message', function () {
      it('creates clear message action', function () {
        return expect(clearMessage('message_id')).toDispatchAction({
          type: CLEAR_MESSAGE,
          payload: {
            id: 'message_id',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(clearMessage('message_id')).toDispatchFSACompliantActions();
      });
    });
  });

  describe('#resetMessages', function () {
    it('creates reset messages action', function () {
      return expect(resetMessages()).toDispatchAction({
        type: RESET_MESSAGES,
      });
    });

    it('creates FSA compliant actions', function () {
      return expect(resetMessages()).toDispatchFSACompliantActions();
    });
  });
});
