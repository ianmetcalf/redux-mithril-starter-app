import m from 'mithril';
import classNames from 'classnames';
import styles from './style.css';

const RepoStats = {
  view({attrs}) {
    const {
      className = '',
      loading = false,
      values = null,
    } = attrs;

    const {
      forks_count: forksCount,
      stargazers_count: stargazersCount,
      open_issues_count: openIssuesCount,
    } = values || {};

    return (
      <div className={classNames(styles.container, className)}>
        <span className={styles.label}>Repo:</span>

        {!values ?
          <span>{loading ? 'Loading...' : 'Stats not available'}</span>
        :
          <ul>
            <li>
              <span className={styles.stat}>{forksCount}</span>
              {forksCount === 1 ? 'Fork' : 'Forks'}
            </li>
            <li>
              <span className={styles.stat}>{stargazersCount}</span>
              {stargazersCount === 1 ? 'Star' : 'Stars'}
            </li>
            <li>
              <span className={styles.stat}>{openIssuesCount}</span>
              {openIssuesCount === 1 ? 'Issue' : 'Issues'}
            </li>
          </ul>
        }
      </div>
    );
  },
};

export default RepoStats;
