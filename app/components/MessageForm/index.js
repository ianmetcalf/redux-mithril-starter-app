import m from 'mithril';
import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import styles from './style.css';

const MessageForm = {
  controller({onChange = () => {}, onSubmit = () => {}}) {
    return {
      handleChange(e = event) {
        const {name, type, value} = e.currentTarget || this;

        onChange(name, type === 'number' ? parseFloat(value) : value);
      },

      handleSubmit(e = event) {
        e.preventDefault();

        onSubmit();
      },
    };
  },

  view(ctrl, {className, values, onClearLast}) {
    return (
      <form className={classNames(styles.container, className)}>
        <div>
          <label>
            Message
            <input
              type="text"
              name="message"
              value={values.message || ''}
              onchange={ctrl.handleChange}
            />
          </label>
        </div>

        <div>
          <label> Duration
            <input
              type="number"
              name="duration"
              value={values.duration || 0}
              onchange={ctrl.handleChange}
            />
            Sec
          </label>
        </div>

        <div>
          {['info', 'success', 'warning', 'error'].map(type => (
            <label>
              <input
                type="radio"
                name="type"
                value={type}
                checked={type === (values.type || 'info')}
                onchange={ctrl.handleChange}
              />
              {capitalize(type)}
            </label>
          ))}
        </div>

        <div>
          <button type="submit" onclick={ctrl.handleSubmit}>Show</button>
          <button type="button" onclick={onClearLast}>Clear Last</button>
        </div>
      </form>
    );
  },
};

export default MessageForm;
