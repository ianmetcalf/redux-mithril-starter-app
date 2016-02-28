import m from 'mithril';
import capitalize from 'lodash/capitalize';
import {getFormValues, getMessages} from '../selectors';
import {setFormValues, addMessage, removeMessage} from '../actions';

const MessageForm = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    if (!getFormValues(getState(), 'message')) {
      dispatch(setFormValues('message', {
        message: '',
        type: 'info',
      }));
    }

    return {
      getState,

      handleChange(e = event) {
        const target = e.currentTarget || this;

        const values = {
          ...getFormValues(getState(), 'message'),
          [target.name]: target.value,
        };

        dispatch(setFormValues('message', values));
      },

      handleSubmit(e = event) {
        e.preventDefault();

        const {message, type} = getFormValues(getState(), 'message');

        if (message) {
          dispatch(addMessage({body: message, type}));
        }
      },

      handleClearLast() {
        const messages = getMessages(getState());
        const last = messages[messages.length - 1];

        if (last) {
          dispatch(removeMessage(last.id));
        }
      },
    };
  },

  view(ctrl) {
    const values = getFormValues(ctrl.getState(), 'message');

    return (
      <form className="message-form">
        <div>
          <label>
            Message
            <input type="text" name="message"
              value={values.message}
              onchange={ctrl.handleChange}
            />
          </label>
        </div>
        <div>
        {['info', 'success', 'warning', 'error'].map(type =>
          <label>
            <input type="radio" name="type" value={type}
              checked={values.type === type}
              onchange={ctrl.handleChange}
            />
            {capitalize(type)}
          </label>
        )}
        </div>
        <div>
          <button
            type="submit"
            onclick={ctrl.handleSubmit}
          >Show</button>
          <button
            type="button"
            onclick={ctrl.handleClearLast}
          >Clear Last</button>
        </div>
      </form>
    );
  },
};

export default MessageForm;
