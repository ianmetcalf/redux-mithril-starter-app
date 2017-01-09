import expect from 'expect';
import freeze from 'deep-freeze';

import {
  getFormFocus,
  getFormValues,
} from '../../../app/selectors/form';

describe('form selectors', function () {
  describe('#getFormFocus', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          forms: {},
        });

        expect(() => getFormFocus(state)).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('returns focus selector if form exists', function () {
        const state = freeze({
          forms: {
            'some form': {
              focus: 'some-selector',
              values: {
                prop: 'some prop',
              },
            },
          },
        });

        expect(getFormFocus(state, 'some form')).toEqual('some-selector');
      });

      it('returns null if form does not exist', function () {
        const state = freeze({
          forms: {},
        });

        expect(getFormFocus(state, 'some form')).toEqual(null);
      });
    });
  });

  describe('#getFormValues', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          forms: {},
        });

        expect(() => getFormValues(state)).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('returns values if form exists', function () {
        const state = freeze({
          forms: {
            'some form': {
              focus: 'some-selector',
              values: {
                prop: 'some prop',
              },
            },
          },
        });

        expect(getFormValues(state, 'some form')).toEqual({
          prop: 'some prop',
        });
      });

      it('returns null if form does not exist', function () {
        const state = freeze({
          forms: {},
        });

        expect(getFormValues(state, 'some form')).toEqual(null);
      });
    });
  });
});
