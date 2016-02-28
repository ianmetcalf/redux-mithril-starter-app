import m from 'mithril';
import MessageForm from './MessageForm';
import Messages from './Messages';

const Root = {
  view(ctrl, attrs) {
    return (
      <div className="root-container">
        <MessageForm {...attrs} />
        <Messages {...attrs} />
      </div>
    );
  },
};

export default Root;
