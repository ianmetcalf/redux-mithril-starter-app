import m from 'mithril';
import classNames from 'classnames';
import RepoStatsComponent from '../components/RepoStats';
import {getEntityById, isRequesting} from '../selectors';
import {fetchEntityAndShowMessage} from '../actions';
import styles from './style.css';

const FETCH_RATE = 90 * 1000;

const RepoStats = {
  oninit({attrs}) {
    const {
      store,
      repo,
    } = attrs;

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

  view({attrs}) {
    const {
      store,
      className,
      repo,
    } = attrs;

    const state = store.getState();
    const loading = isRequesting(state, repo);
    const values = getEntityById(state, 'repos', repo);

    return (
      <RepoStatsComponent
        className={classNames(styles.repoStats, className)}
        loading={loading}
        values={values}
      />
    );
  },
};

export default RepoStats;
