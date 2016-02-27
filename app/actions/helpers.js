import {normalize} from 'normalizr';
import {isPending} from '../selectors';

export function createFetchAction(type = null, {
  url,
  method = 'GET',
  id = `${ method } ${ url }`,
  meta,
  schema,
  ...options,
} = {}) {
  if (type === null) throw new Error('Must specify an action type to create fetch action');
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
    if (isPending(getState(), id)) {
      return Promise.reject({message: `A pending ${ type } action already exists`});
    }

    dispatch({
      type,
      meta: {
        ...meta,
        pending: {id},
      },
    });

    return fetch(url, {
      credentials: 'same-origin',
      method,
      ...opts,
    })

    .then(resp => resp.json().then(json => {
      const payload = resp.ok && schema ? normalize(json, schema) : json;

      dispatch({
        type,
        error: !resp.ok,
        payload,
        meta: {
          ...meta,
          pending: {id, completed: true},
        },
      });

      return resp.ok ? json : Promise.reject(json);
    }), err => dispatch({
      type,
      error: true,
      payload: err,
      meta: {
        ...meta,
        pending: {id, completed: true},
      },
    }));
  };
}
