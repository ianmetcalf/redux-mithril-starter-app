import m from 'mithril';
import {getMessages} from '../selectors';
import {clearMessage} from '../actions';
import Message from '../components/Message';

const Messages = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    return {
      getState,

      handleClose(id) {
        dispatch(clearMessage(id));
      },
    };
  },

  view(ctrl) {
    const messages = getMessages(ctrl.getState());

    return (
      <div className="message-container">
      {messages.map(item =>
        <Message key={item.id} {...item} onClose={ctrl.handleClose} />
      )}
      </div>
    );
  },
};

export default Messages;
