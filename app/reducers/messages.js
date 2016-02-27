import {createReducer} from './helpers';
import {ADD_MESSAGE, REMOVE_MESSAGE, RESET_MESSAGES} from '../actions';

const messages = createReducer([], {
  [ADD_MESSAGE](state, action) {
    return [
      ...state,
      {
        id: state.reduce((memo, item) => Math.max(item.id, memo), -1) + 1,
        ...action.payload,
      },
    ];
  },

  [REMOVE_MESSAGE](state, action) {
    return state.filter(item => item.id !== action.payload.id);
  },

  [RESET_MESSAGES](state, action) {
    return [];
  },
});

export default messages;
