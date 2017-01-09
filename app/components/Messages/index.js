import m from 'mithril';
import classNames from 'classnames';
import styles from './style.css';

const Messages = {
  view(ctrl, {className, messages, onClose = () => {}}) {
    return (
      <div className={classNames(styles.container, className)}>
        {messages.map(item => (
          <div key={item.id} className={styles[item.type] || styles.message}>
            <button
              className={styles.close}
              type="button"
              role="button"
              onclick={() => onClose(item.id)}
            >&times;</button>
            <div className={styles.body}>{item.body}</div>
          </div>
        ))}
      </div>
    );
  },
};

export default Messages;
