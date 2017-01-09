const reducer = (state = {}, action) => {
  const {
    meta: {
      request: {
        id,
        pending = false,
        completed = false,
        ...attrs
      } = {},
    } = {},
  } = action;

  if (id) {
    return {
      ...state,
      [id]: {
        pending,
        completed,
        ...attrs,
      },
    };
  }

  return state;
};

export default reducer;
