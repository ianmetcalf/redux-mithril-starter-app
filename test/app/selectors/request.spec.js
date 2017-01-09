import expect from 'expect';
import freeze from 'deep-freeze';

import {
  isRequesting,
  wasRequested,
} from '../../../app/selectors/request';

describe('request selectors', function () {
  describe('#isRequesting', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          requests: {},
        });

        expect(() => isRequesting(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns false if request is not pending', function () {
        const state = freeze({
          requests: {},
        });

        expect(isRequesting(state, 'GET /api/users')).toBe(false);
      });

      it('returns true if request is pending', function () {
        const state = freeze({
          requests: {
            'GET /api/users': {
              pending: true,
            },
          },
        });

        expect(isRequesting(state, 'GET /api/users')).toBe(true);
      });

      it('returns false if request has completed', function () {
        const state = freeze({
          requests: {
            'GET /api/users': {
              completed: true,
            },
          },
        });

        expect(isRequesting(state, 'GET /api/users')).toBe(false);
      });
    });
  });

  describe('#wasRequested', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          requests: {},
        });

        expect(() => wasRequested(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns false if request is not pending', function () {
        const state = freeze({
          requests: {},
        });

        expect(wasRequested(state, 'GET /api/users')).toBe(false);
      });

      it('returns false if request is pending', function () {
        const state = freeze({
          requests: {
            'GET /api/users': {
              pending: true,
            },
          },
        });

        expect(wasRequested(state, 'GET /api/users')).toBe(false);
      });

      it('returns true if request has completed', function () {
        const state = freeze({
          requests: {
            'GET /api/users': {
              completed: true,
            },
          },
        });

        expect(wasRequested(state, 'GET /api/users')).toBe(true);
      });
    });
  });
});
