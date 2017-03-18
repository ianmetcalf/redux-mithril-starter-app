import m from 'mithril';
import MessageForm from './MessageForm';
import Message from './Message';
import RepoStats from './RepoStats';

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
