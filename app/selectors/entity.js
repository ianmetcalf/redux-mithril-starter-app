import isMatch from 'lodash/isMatch';
import orderBy from 'lodash/orderBy';
import unzip from 'lodash/unzip';

export function getEntities(state = {}, entity, options = {}) {
  if (!entity) throw new Error('Must specify an entity to get');

  const {
    entities: {
      [entity]: entities = {},
    } = {},
  } = state;

  const items = Object.keys(entities).reduce((memo, id) => {
    const item = entities[id];

    if ('limit' in options && memo.length >= options.limit) {
      return memo;
    }

    if ('where' in options && !isMatch(item, options.where)) {
      return memo;
    }

    return [...memo, item];
  }, []);

  if ('order' in options) {
    const {order} = options;

    if (Array.isArray(order) && Array.isArray(order[0])) {
      return orderBy(items, ...unzip(order));
    }

    return orderBy(items, order);
  }

  return items;
}

export function getEntityById(state = {}, entity, id) {
  if (!entity) throw new Error('Must specify an entity to get');
  if (!id) throw new Error('Must specify an id to get');

  const {
    entities: {
      [entity]: {
        [id]: item = null,
      } = {},
    } = {},
  } = state;

  return item;
}
