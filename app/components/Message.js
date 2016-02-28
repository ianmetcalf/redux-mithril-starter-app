import m from 'mithril';

const Message = {
  controller({id, onRemove}) {
    return {
      handleClickRemove() {
        onRemove(id);
      },
    };
  },

  view(ctrl, {id, type, body}) {
    return (
      <div key={id} className={`message-${ type }`}>
        <button className="message-remove-button"
          type="button"
          role="button"
          onclick={ctrl.handleClickRemove}
        >&times;</button>
        <div className="message-body">{body}</div>
      </div>
    );
  },
};

export default Message;
