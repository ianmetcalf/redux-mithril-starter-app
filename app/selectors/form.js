export function getFormFocus(state = {}, id) {
  if (!id) throw new Error('Must specify a form to get focus');

  const {
    forms: {
      [id]: {
        focus = null,
      } = {},
    } = {},
  } = state;

  return focus;
}

export function getFormValues(state = {}, id) {
  if (!id) throw new Error('Must specify a form to get values');

  const {
    forms: {
      [id]: {
        values = null,
      } = {},
    } = {},
  } = state;

  return values;
}
