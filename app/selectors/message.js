import isMatch from 'lodash/isMatch';

export function getMessages(state = {}) {
  const {
    messages = [],
  } = state;

  return messages;
}

export function getMessagesWhere(state, criteria = {}) {
  const messages = getMessages(state);

  return messages.filter(item => isMatch(item, criteria));
}

export function getMessageById(state, id) {
  if (!id) throw new Error('Must specify an id to get message');

  const messages = getMessages(state);

  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].id === id) return messages[i];
  }

  return null;
}
