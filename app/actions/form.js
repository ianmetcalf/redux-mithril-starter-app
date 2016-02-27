import {SET_FORM_FOCUS, SET_FORM_VALUES} from './constants';

export function setFormFocus(id = null, focus = null) {
  if (id === null) throw new Error('Must specify a form to set focus');

  return {
    type: SET_FORM_FOCUS,
    payload: {
      id,
      focus,
    },
  };
}

export function setFormValues(id = null, values = {}) {
  if (id === null) throw new Error('Must specify a form to set values');

  return {
    type: SET_FORM_VALUES,
    payload: {
      id,
      values,
    },
  };
}
