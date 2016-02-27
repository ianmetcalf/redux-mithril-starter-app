import isMatch from 'lodash/isMatch';

export function getMessages(state = []) {
  return state.messages;
}

export function getMessagesWhere(state = [], criteria = {}) {
  return state.messages.filter(item => isMatch(item, criteria));
}

export function getMessageById(state = [], id = null) {
  if (id === null) throw new Error('Must specify an id to get message');

  for (let i = 0; i < state.messages.length; i++) {
    if (state.messages[i].id === id) return state.messages[i];
  }

  return null;
}
