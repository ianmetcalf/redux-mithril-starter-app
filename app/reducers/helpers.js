export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type] || handlers[createReducer.DEFAULT];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
}

createReducer.DEFAULT = '@@DEFAULT';
