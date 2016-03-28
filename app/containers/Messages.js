import m from 'mithril';
import classNames from 'classnames';
import MessagesComponent from '../components/Messages';
import {getMessages} from '../selectors';
import {clearMessage} from '../actions';
import styles from './style.css';

const Messages = {
  controller(attrs) {
    const {dispatch} = attrs.store;

    return {
      handleClose(id) {
        dispatch(clearMessage(id));
      },
    };
  },

  view(ctrl, {store, className}) {
    const state = store.getState();

    return (
      <MessagesComponent className={classNames(styles.messages, className)}
        messages={getMessages(state)}
        onClose={ctrl.handleClose}
      />
    );
  },
};

export default Messages;
