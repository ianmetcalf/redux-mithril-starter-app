import {createReducer} from './helpers';
import {SET_FORM_FOCUS, SET_FORM_VALUES} from '../actions';

const forms = createReducer({}, {
  [SET_FORM_FOCUS](state, action) {
    const {id, focus} = action.payload;

    return {
      ...state,
      [id]: {
        ...state[id],
        focus,
      },
    };
  },

  [SET_FORM_VALUES](state, action) {
    const {id, values} = action.payload;

    return {
      ...state,
      [id]: {
        ...state[id],
        values,
      },
    };
  },
});

export default forms;
