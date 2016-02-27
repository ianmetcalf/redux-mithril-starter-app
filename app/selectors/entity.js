import isMatch from 'lodash/isMatch';

export function getEntities(state = {}, key = null) {
  if (key === null) throw new Error('Must specify a key to get entities');

  const {entities: {[key]: entities = {}} = {}} = state;

  return Object.keys(entities).map(id => entities[id]);
}

export function getEntitiesWhere(state = {}, key = null, criteria = {}) {
  if (key === null) throw new Error('Must specify a key to get entities');

  const {entities: {[key]: entities = {}} = {}} = state;

  return Object.keys(entities).reduce((memo, id) => {
    const entity = entities[id];

    return isMatch(entity, criteria) ? [...memo, entity] : memo;
  }, []);
}

export function getEntityById(state = {}, key = null, id = null) {
  if (key === null) throw new Error('Must specify a key to get entity');
  if (id === null) throw new Error('Must specify an id to get entity');

  const {entities: {[key]: {[id]: entity = null} = {}} = {}} = state;

  return entity;
}
