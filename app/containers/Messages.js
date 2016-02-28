import m from 'mithril';
import {getMessages} from '../selectors';
import {removeMessage} from '../actions';
import Message from '../components/Message';

const Messages = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    return {
      getState,

      handleRemove(id) {
        dispatch(removeMessage(id));
      },
    };
  },

  view(ctrl) {
    const messages = getMessages(ctrl.getState());

    return (
      <div className="message-container">
      {messages.map(item =>
        <Message {...item} onRemove={ctrl.handleRemove} />
      )}
      </div>
    );
  },
};

export default Messages;
