import m from 'mithril';
import classNames from 'classnames';
import RepoStatsComponent from '../components/RepoStats';
import {getEntityById, isRequesting} from '../selectors';
import {fetchEntityAndShowMessage} from '../actions';
import styles from './style.css';

const FETCH_RATE = 90 * 1000;

const RepoStats = {
  controller(attrs) {
    const {dispatch} = attrs.store;

    let timeout = null;

    function nextFetch() {
      dispatch(fetchEntityAndShowMessage('repo', {
        id: attrs.repo,
      }))

      .then(() => {
        timeout = setTimeout(nextFetch, FETCH_RATE);
      });
    }

    nextFetch();

    return {
      onunload() {
        if (!timeout) return;

        clearTimeout(timeout);
        timeout = null;
      },
    };
  },

  view(ctrl, {store, className, repo}) {
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
