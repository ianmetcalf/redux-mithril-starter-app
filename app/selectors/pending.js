export function isPending(state = {}, id = null) {
  if (id === null) throw new Error('Must specify an id to check pending');

  const {pending = []} = state;

  return pending.some(item => item.id === id);
}
