import uniqueId from 'lodash/uniqueId';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  RESET_MESSAGES,
} from './constants';

export function showMessage({body = '', type = 'success', duration, ...attrs} = {}) {
  if (!body.length) throw new Error('Must specify a body for message');

  return (dispatch, getState) => {
    const id = attrs.id || uniqueId('_message_');

    dispatch({
      type: SHOW_MESSAGE,
      payload: {
        ...attrs,
        id,
        body,
        type,
      },
    });

    return new Promise((resolve, reject) => {
      if (duration > 0) {
        setTimeout(() => {
          dispatch(clearMessage(id));
          resolve();
        }, duration * 1000);
      } else {
        resolve();
      }
    });
  };
}

export function clearMessage(id) {
  if (!id) throw new Error('Must specify a message to remove');

  return {
    type: CLEAR_MESSAGE,
    payload: {
      id,
    },
  };
}

export function resetMessages() {
  return {
    type: RESET_MESSAGES,
  };
}
