export default function pending(state = [], action) {
  const {meta: {pending: {id, completed, ...attrs} = {}} = {}} = action;

  if (id) {
    if (completed) {
      return state.filter(item => item.id !== id);
    }

    return [...state, {id, ...attrs}];
  }

  return state;
}
