import {createReducer} from './helpers';

import {
  SET_FORM_FOCUS,
  SET_FORM_VALUES,
} from '../actions';

const reducer = createReducer({}, {
  [SET_FORM_FOCUS](state, action) {
    const {
      payload: {
        id,
        focus,
      } = {},
    } = action;

    return {
      ...state,
      [id]: {
        ...state[id],
        focus,
      },
    };
  },

  [SET_FORM_VALUES](state, action) {
    const {
      payload: {
        id,
        values,
      } = {},
    } = action;

    return {
      ...state,
      [id]: {
        ...state[id],
        values,
      },
    };
  },
});

export default reducer;
