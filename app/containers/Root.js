import m from 'mithril';
import RepoStats from './RepoStats';
import MessageForm from './MessageForm';
import Message from './Message';

const Root = {
  view({attrs}) {
    return (
      <div>
        <RepoStats {...attrs} repo="ianmetcalf/redux-mithril-starter-app" />
        <MessageForm {...attrs} />
        <Message {...attrs} />
      </div>
    );
  },
};

export default Root;
