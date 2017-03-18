import m from 'mithril';
import MessageForm from './MessageForm';
import Messages from './Messages';
import RepoStats from './RepoStats';

const Root = {
  view({attrs}) {
    return (
      <div>
        <RepoStats {...attrs} repo="ianmetcalf/redux-mithril-starter-app" />
        <MessageForm {...attrs} />
        <Messages {...attrs} />
      </div>
    );
  },
};

export default Root;
