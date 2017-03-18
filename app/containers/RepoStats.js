import m from 'mithril';
import classNames from 'classnames';
import RepoStatsComponent from '../components/RepoStats';
import {getEntityById, isRequesting} from '../selectors';
import {fetchEntityAndShowMessage} from '../actions';
import styles from './style.css';

const FETCH_RATE = 90 * 1000;

const RepoStats = {
  oninit({attrs: {store, repo}}) {
    const nextFetch = () => {
      store.dispatch(fetchEntityAndShowMessage('repo', {
        id: repo,
      }))

      .then(() => {
        this.timeout = setTimeout(nextFetch, FETCH_RATE);
      });
    };

    nextFetch();
  },

  onremove() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },

  view({attrs: {store, className, repo}}) {
    const state = store.getState();

    return (
      <RepoStatsComponent
        className={classNames(styles.repoStats, className)}
        repo={getEntityById(state, 'repos', repo)}
        pending={isRequesting(state, repo)}
      />
    );
  },
};

export default RepoStats;
