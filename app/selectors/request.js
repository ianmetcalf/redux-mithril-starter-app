export function isRequesting(state = {}, id) {
  if (!id) throw new Error('Must specify an id to check pending request');

  const {
    requests: {
      [id]: {
        pending = false,
      } = {},
    } = {},
  } = state;

  return pending;
}

export function wasRequested(state = {}, id) {
  if (!id) throw new Error('Must specify an id to check completed request');

  const {
    requests: {
      [id]: {
        completed = false,
      } = {},
    } = {},
  } = state;

  return completed;
}
