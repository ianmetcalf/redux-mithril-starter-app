import {combineReducers} from 'redux';
import entities from './entities';
import forms from './forms';
import messages from './messages';
import pending from './pending';

const root = combineReducers({
  entities,
  forms,
  messages,
  pending,
});

export default root;
