import m from 'mithril';
import classNames from 'classnames';
import MessageFormComponent from '../components/MessageForm';
import {getFormValues, getMessages} from '../selectors';
import {setFormValues, showMessage, clearMessage} from '../actions';
import styles from './style.css';

const FORM_ID = 'message';

const MessageForm = {
  oninit({attrs}) {
    const {
      store,
    } = attrs;

    if (!getFormValues(store.getState(), FORM_ID)) {
      store.dispatch(setFormValues(FORM_ID, {
        message: '',
        type: 'info',
        duration: 0,
      }));
    }

    this.ctrl = {
      handleChange(name, value) {
        store.dispatch(setFormValues(FORM_ID, {
          ...getFormValues(store.getState(), FORM_ID),
          [name]: value,
        }));
      },

      handleSubmit() {
        const {message, type, duration} = getFormValues(store.getState(), FORM_ID);

        if (message) {
          store.dispatch(showMessage({body: message, type, duration}));
        }
      },

      handleClearLast() {
        const messages = getMessages(store.getState());
        const last = messages[messages.length - 1];

        if (last) {
          store.dispatch(clearMessage(last.id));
        }
      },
    };
  },

  view({attrs, state: {ctrl}}) {
    const {
      store,
      className,
    } = attrs;

    const state = store.getState();

    return (
      <MessageFormComponent
        className={classNames(styles.messageForm, className)}
        values={getFormValues(state, FORM_ID) || {}}
        onChange={ctrl.handleChange}
        onSubmit={ctrl.handleSubmit}
        onClearLast={ctrl.handleClearLast}
      />
    );
  },
};

export default MessageForm;
