import {createReducer} from './helpers';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  RESET_MESSAGES,
} from '../actions';

const reducer = createReducer([], {
  [SHOW_MESSAGE](state, action) {
    const {
      payload: message = {},
    } = action;

    return [
      ...state.filter(item => item.id !== message.id),
      message,
    ];
  },

  [CLEAR_MESSAGE](state, action) {
    const {
      payload: message = {},
    } = action;

    return state.filter(item => item.id !== message.id);
  },

  [RESET_MESSAGES](state, action) {
    return [];
  },
});

export default reducer;
