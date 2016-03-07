import expect from 'expect';
import {isFSA} from 'flux-standard-action';
import {SET_FORM_FOCUS, SET_FORM_VALUES} from '../../../app/actions/constants';
import {setFormFocus, setFormValues} from '../../../app/actions/form';

describe('form actions', function () {
  describe('#setFormFocus', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        expect(() => setFormFocus()).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('creates SET_FORM_FOCUS action', function () {
        expect(setFormFocus('some form', 'some-selector')).toEqual({
          type: SET_FORM_FOCUS,
          payload: {
            id: 'some form',
            focus: 'some-selector',
          },
        });
      });

      it('creates FSA compliant action', function () {
        expect(isFSA(setFormFocus('some form', 'some-selector'))).toBe(true);
      });
    });
  });

  describe('#setFormValues', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        expect(() => setFormValues()).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('creates SET_FORM_VALUES action', function () {
        expect(setFormValues('some form', {prop: 'some prop'})).toEqual({
          type: SET_FORM_VALUES,
          payload: {
            id: 'some form',
            values: {
              prop: 'some prop',
            },
          },
        });
      });

      it('creates FSA compliant action', function () {
        expect(isFSA(setFormValues('some form', {prop: 'some prop'}))).toBe(true);
      });
    });
  });
});
