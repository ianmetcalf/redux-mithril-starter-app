import m from 'mithril';

export function mithrilMiddleware() {
  return next => action => {
    m.startComputation();

    const result = next(action);

    m.endComputation();

    return result;
  };
}
