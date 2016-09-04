import m from 'mithril';
import classNames from 'classnames';
import MessageFormComponent from '../components/MessageForm';
import {getFormValues, getMessages} from '../selectors';
import {setFormValues, showMessage, clearMessage} from '../actions';
import styles from './style.css';

const FORM_ID = 'message';

const MessageForm = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    if (!getFormValues(getState(), FORM_ID)) {
      dispatch(setFormValues(FORM_ID, {
        message: '',
        type: 'info',
        duration: 0,
      }));
    }

    return {
      handleChange(name, value) {
        dispatch(setFormValues(FORM_ID, {
          ...getFormValues(getState(), FORM_ID),
          [name]: value,
        }));
      },

      handleSubmit() {
        const {message, type, duration} = getFormValues(getState(), FORM_ID);

        if (message) {
          dispatch(showMessage({body: message, type, duration}));
        }
      },

      handleClearLast() {
        const messages = getMessages(getState());
        const last = messages[messages.length - 1];

        if (last) {
          dispatch(clearMessage(last.id));
        }
      },
    };
  },

  view(ctrl, {store, className}) {
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
