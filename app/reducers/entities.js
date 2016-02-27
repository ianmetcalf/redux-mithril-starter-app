import merge from 'lodash/merge';

export default function entities(state = {}, action) {
  if (!action.error && action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
}
