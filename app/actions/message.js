import {ADD_MESSAGE, REMOVE_MESSAGE, RESET_MESSAGES} from './constants';

export function addMessage({body = '', type = 'success', ...attrs} = {}) {
  if (!body.length) throw new Error('Must specify a body for message');

  return {
    type: ADD_MESSAGE,
    payload: {
      body,
      type,
      ...attrs,
    },
  };
}

export function removeMessage(id = null) {
  if (id === null) throw new Error('Must specify an id to remove message');

  return {
    type: REMOVE_MESSAGE,
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
