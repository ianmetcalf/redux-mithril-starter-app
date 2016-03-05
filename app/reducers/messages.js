import {createReducer} from './helpers';
import {SHOW_MESSAGE, CLEAR_MESSAGE, RESET_MESSAGES} from '../actions';

const messages = createReducer([], {
  [SHOW_MESSAGE](state, action) {
    return [...state.filter(item => item.id !== action.payload.id), action.payload];
  },

  [CLEAR_MESSAGE](state, action) {
    return state.filter(item => item.id !== action.payload.id);
  },

  [RESET_MESSAGES](state, action) {
    return [];
  },
});

export default messages;
