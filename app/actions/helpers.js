import {normalize} from 'normalizr';
import {isRequesting} from '../selectors';

export function createRequest(type, {
  url,
  method = 'GET',
  id = `${ method } ${ url }`,
  meta,
  schema,
  ...options
} = {}) {
  if (!type) throw new Error('Must specify an action type to create request');
  if (typeof url !== 'string') throw new Error(`Must specify a url to create ${ type } action`);

  let opts = options;

  if (opts.body && typeof opts.body !== 'string') {
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts.body),
    };
  }

  return (dispatch, getState) => {
    if (isRequesting(getState(), id)) return Promise.resolve();

    dispatch({
      type,
      meta: {
        ...meta,
        request: {
          id,
          pending: true,
        },
      },
    });

    return fetch(url, {
      credentials: 'same-origin',
      method,
      ...opts,
    })

    // Normalize the result of the fetch and catch error conditions
    .then(resp => resp.json().then(json => ({
      error: !resp.ok,
      payload: json,
    }), () => ({
      error: true,
      payload: {
        message: 'Server Error',
      },
    })), () => ({
      error: true,
      payload: {
        message: 'Network Error',
      },
    }))

    .then(({error, payload}) => dispatch({
      type,
      error,
      payload: schema && !error ? normalize(payload, schema) : payload,
      meta: {
        ...meta,
        request: {
          id,
          completed: true,
        },
      },
    }));
  };
}
