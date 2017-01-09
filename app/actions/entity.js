import startCase from 'lodash/startCase';
import * as entities from './entities';
import {createRequest} from './helpers';
import {showMessage} from './message';
import {wasRequested} from '../selectors';

import {
  FETCH_ENTITY,
  SAVE_ENTITY,
  REMOVE_ENTITY,
} from './constants';

export function fetchEntity(entity, options = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to fetch');

  const {url, schema} = entities[entity];

  if (options.id) {
    return createRequest(FETCH_ENTITY, {
      id: `fetch_${ entity }_${ options.id }`,
      url: `${ url }/${ options.id }`,
      method: 'GET',
      schema,
    });
  }

  const {plural} = entities[entity];

  return createRequest(FETCH_ENTITY, {
    id: `fetch_${ plural }`,
    url,
    method: 'GET',
    schema: [schema],
  });
}

export function fetchEntityAndShowMessage(entity, options = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to fetch');

  const {plural} = entities[entity];

  return dispatch => dispatch(fetchEntity(entity, options))

  .then(resp => {
    const {error} = resp || {};

    if (error) {
      dispatch(showMessage({
        body: `Failed to fetch ${ options.id ? entity : plural }`,
        type: 'error',
        duration: 10,
      }));
    }

    return resp;
  });
}

export function fetchEntityIfNeeded(entity, options = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to fetch');

  const {plural} = entities[entity];
  let request;

  if (options.id) {
    request = `fetch_${ entity }_${ options.id }`;
  } else {
    request = `fetch_${ plural }`;
  }

  return (dispatch, getState) => {
    if (wasRequested(getState(), request)) return Promise.resolve();

    if (options.silent) {
      return dispatch(fetchEntity(entity, options));
    }

    return dispatch(fetchEntityAndShowMessage(entity, options));
  };
}

export function saveEntity(entity, {id, ...values} = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to save');

  const {url, schema} = entities[entity];

  if (!id) {
    return createRequest(SAVE_ENTITY, {
      id: `save_new_${ entity }`,
      url,
      method: 'POST',
      body: values,
      schema,
    });
  }

  return createRequest(SAVE_ENTITY, {
    id: `save_${ entity }_${ id }`,
    url: `${ url }/${ id }`,
    method: 'PUT',
    body: values,
    schema,
  });
}

export function saveEntityAndShowMessage(entity, values = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to save');

  return dispatch => dispatch(saveEntity(entity, values))

  .then(resp => {
    const {error, payload: {errors, message} = {}} = resp || {};
    const messages = [];

    if (Array.isArray(errors)) {
      errors.forEach(item => {
        let body = item.message;
        const field = item.field;

        if (body && field) {
          if (body.indexOf(field) === 0) {
            body = body.replace(field, startCase(field));
          } else {
            body = `${ startCase(field) } ${ body }`;
          }

          messages.push({
            body,
            type: 'warning',
            duration: 10,
          });
        }
      });
    }

    if (resp && !messages.length) {
      dispatch(showMessage({
        body: message || (!error ? `${ entity } saved` : `failed to save ${ entity }`),
        type: !error ? 'success' : 'warning',
        duration: 10,
      }));
    } else {
      messages.forEach(msg => dispatch(showMessage(msg)));
    }

    return resp;
  });
}

export function removeEntity(entity, options = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to remove');
  if (!options.id) throw new Error('Must specify an id to remove entity');

  const {url, schema} = entities[entity];

  return createRequest(REMOVE_ENTITY, {
    id: `remove_${ entity }_${ options.id }`,
    url: `${ url }/${ options.id }`,
    method: 'DELETE',
    schema,
  });
}

export function removeEntityAndShowMessage(entity, options = {}) {
  if (!(entity in entities)) throw new Error('Must specify a known entity to remove');
  if (!options.id) throw new Error('Must specify an id to remove entity');

  return dispatch => dispatch(removeEntity(entity, options))

  .then(resp => {
    const {error, payload: {message} = {}} = resp || {};

    if (resp) {
      dispatch(showMessage({
        body: message || (!error ? `${ entity } removed` : `failed to remove ${ entity }`),
        type: !error ? 'success' : 'warning',
        duration: 10,
      }));
    }

    return resp;
  });
}
