import expect from 'expect';
import freeze from 'deep-freeze';
import {isPending} from '../../../app/selectors/pending';

describe('pending selectors', function () {
  describe('#isPending', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          pending: [],
        });

        expect(() => isPending(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns true if action is pending', function () {
        const state = freeze({
          pending: [
            {id: 'GET /api/users'},
          ],
        });

        expect(isPending(state, 'GET /api/users')).toBe(true);
      });

      it('returns false if action is not pending', function () {
        const state = freeze({
          pending: [
            {id: 'GET /api/users'},
          ],
        });

        expect(isPending(state, 'POST /api/teams')).toBe(false);
      });
    });
  });
});
