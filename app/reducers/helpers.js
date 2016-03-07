const INVALID_KEYS = ['', 'undefined', 'null'];

export function createReducer(initialState, handlers = {}) {
  let count = 0;

  for (const key in handlers) {
    if (handlers.hasOwnProperty(key) && INVALID_KEYS.indexOf(key) < 0) {
      count += 1;
    } else {
      throw new Error('Unexpected action type found while creating reducer');
    }
  }

  if (!count) throw new Error('No action types found while creating reducer');

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type] || handlers[createReducer.DEFAULT];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
}

createReducer.DEFAULT = '@@DEFAULT';
