import m from 'mithril';
import classNames from 'classnames';
import MessageComponent from '../components/Message';
import {getMessages} from '../selectors';
import {clearMessage} from '../actions';
import styles from './style.css';

const Message = {
  oninit({attrs}) {
    const {
      store,
    } = attrs;

    this.ctrl = {
      handleClose(id) {
        store.dispatch(clearMessage(id));
      },
    };
  },

  view({attrs, state: {ctrl}}) {
    const {
      store,
      className,
    } = attrs;

    const state = store.getState();
    const messages = getMessages(state) || [];

    return (
      <MessageComponent
        className={classNames(styles.messages, className)}
        messages={messages}
        onClose={ctrl.handleClose}
      />
    );
  },
};

export default Message;
