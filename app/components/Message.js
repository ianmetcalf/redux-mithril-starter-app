import m from 'mithril';

const Message = {
  controller({id, onClose}) {
    return {
      handleClose() {
        onClose(id);
      },
    };
  },

  view(ctrl, {type, body}) {
    return (
      <div className={`message-${ type }`}>
        <button className="message-close-button"
          type="button"
          role="button"
          onclick={ctrl.handleClose}
        >&times;</button>
        <div className="message-body">{body}</div>
      </div>
    );
  },
};

export default Message;
