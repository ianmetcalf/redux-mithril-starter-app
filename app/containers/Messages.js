import m from 'mithril';
import classNames from 'classnames';
import MessagesComponent from '../components/Messages';
import {getMessages} from '../selectors';
import {clearMessage} from '../actions';
import styles from './style.css';

const Messages = {
  oninit({attrs: {store}}) {
    this.ctrl = {
      handleClose(id) {
        store.dispatch(clearMessage(id));
      },
    };
  },

  view({state: {ctrl}, attrs: {store, className}}) {
    const state = store.getState();

    return (
      <MessagesComponent
        className={classNames(styles.messages, className)}
        messages={getMessages(state)}
        onClose={ctrl.handleClose}
      />
    );
  },
};

export default Messages;
