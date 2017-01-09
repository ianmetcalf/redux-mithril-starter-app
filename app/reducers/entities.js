import merge from 'lodash/merge';

const reducer = (state = {}, action) => {
  const {
    payload: {
      entities = null,
    } = {},
    error = false,
  } = action;

  if (entities && !error) {
    return merge({}, state, entities);
  }

  return state;
};

export default reducer;
