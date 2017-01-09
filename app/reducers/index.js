import {combineReducers} from 'redux';
import entities from './entities';
import forms from './forms';
import messages from './messages';
import requests from './requests';

const root = combineReducers({
  entities,
  forms,
  messages,
  requests,
});

export default root;
