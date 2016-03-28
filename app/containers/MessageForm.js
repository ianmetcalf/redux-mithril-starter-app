import m from 'mithril';
import capitalize from 'lodash/capitalize';
import {getFormValues, getMessages} from '../selectors';
import {setFormValues, showMessage, clearMessage} from '../actions';

const MessageForm = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    if (!getFormValues(getState(), 'message')) {
      dispatch(setFormValues('message', {
        message: '',
        type: 'info',
        duration: 0,
      }));
    }

    return {
      getState,

      handleChange(e = event) {
        const {name, value} = e.currentTarget || this;

        const values = {
          ...getFormValues(getState(), 'message'),
          [name]: name === 'duration' ? parseInt(value, 10) : value,
        };

        dispatch(setFormValues('message', values));
      },

      handleSubmit(e = event) {
        e.preventDefault();

        const {message, type, duration} = getFormValues(getState(), 'message');

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
          <label>
            Duration
            <input type="number" name="duration"
              value={values.duration}
              onchange={ctrl.handleChange}
            />
            Sec
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
