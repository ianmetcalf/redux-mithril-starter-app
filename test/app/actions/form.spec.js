import expect from 'expect';

import {
  setFormFocus,
  setFormValues,
} from '../../../app/actions/form';

import {
  SET_FORM_FOCUS,
  SET_FORM_VALUES,
} from '../../../app/actions/constants';

describe('form actions', function () {
  describe('#setFormFocus', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        return expect(() => setFormFocus()).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('creates set focus action', function () {
        return expect(setFormFocus('some form', 'some-selector')).toDispatchAction({
          type: SET_FORM_FOCUS,
          payload: {
            id: 'some form',
            focus: 'some-selector',
          },
        });
      });

      it('creates FSA compliant action', function () {
        return expect(setFormFocus('some form', 'some-selector')).toDispatchFSACompliantActions();
      });
    });
  });

  describe('#setFormValues', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        return expect(() => setFormValues()).toThrow(/must specify a form/i);
      });
    });

    context('when called with id', function () {
      it('creates set form action', function () {
        expect(setFormValues('some form', {prop: 'some prop'})).toDispatchAction({
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
        expect(setFormValues('some form', {prop: 'some prop'})).toDispatchFSACompliantActions();
      });
    });
  });
});
