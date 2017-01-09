const INVALID_KEYS = ['', 'undefined', 'null'];

export function createReducer(initialState, handlers = {}) {
  const count = Object.keys(handlers).reduce((memo, key) => {
    if (INVALID_KEYS.indexOf(key) >= 0) {
      throw new Error('Unexpected action type found while creating reducer');
    }

    return memo + 1;
  }, 0);

  if (!count) throw new Error('No action types found while creating reducer');

  return (state = initialState, action) => {
    const handler = handlers[action.type] || handlers[createReducer.DEFAULT];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
}

createReducer.DEFAULT = '@@DEFAULT';
