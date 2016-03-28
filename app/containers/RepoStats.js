import m from 'mithril';
import {getEntityById, isPending} from '../selectors';
import {fetchRepo, showMessage} from '../actions';

const FETCH_RATE = 90 * 1000;

const RepoStats = {
  controller(attrs) {
    const {getState, dispatch} = attrs.store;

    let timeout = null;

    function nextFetch() {
      dispatch(fetchRepo(attrs.repo)).then(resp => {
        if (resp.error) {
          dispatch(showMessage({
            body: 'Failed to fetch repo',
            type: 'error',
            duration: 10,
          }));
        }

        timeout = setTimeout(nextFetch, FETCH_RATE);
      });
    }

    nextFetch();

    return {
      getState,

      onunload() {
        if (!timeout) return;

        clearTimeout(timeout);
        timeout = null;
      },
    };
  },

  view(ctrl, attrs) {
    const state = ctrl.getState();
    const repo = getEntityById(state, 'repos', attrs.repo);
    const loading = !repo && isPending(state, attrs.repo);

    return (
      <div className="repo-stats">Repo:
        {!repo ? <span className="loading">{loading ? 'Loading...' : 'No information'}</span> :
          <ul>
            <li>
              <span className="stat-value">{repo.forks_count}</span>
              {repo.forks_count === 1 ? 'Fork' : 'Forks'}
            </li>
            <li>
              <span className="stat-value">{repo.stargazers_count}</span>
              {repo.stargazers_count === 1 ? 'Star' : 'Stars'}
            </li>
            <li>
              <span className="stat-value">{repo.open_issues_count}</span>
              {repo.open_issues_count === 1 ? 'Issue' : 'Issues'}
            </li>
          </ul>
        }
      </div>
    );
  },
};

export default RepoStats;
