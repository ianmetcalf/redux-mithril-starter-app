import m from 'mithril';
import classNames from 'classnames';
import styles from './style.css';

const RepoStats = {
  view(ctrl, {className, repo, pending}) {
    return (
      <div className={classNames(styles.container, className)}>
        <span className={styles.label}>Repo:</span>
        {repo ?
          <ul>
            <li>
              <span className={styles.stat}>{repo.forks_count}</span>
              {repo.forks_count === 1 ? 'Fork' : 'Forks'}
            </li>
            <li>
              <span className={styles.stat}>{repo.stargazers_count}</span>
              {repo.stargazers_count === 1 ? 'Star' : 'Stars'}
            </li>
            <li>
              <span className={styles.stat}>{repo.open_issues_count}</span>
              {repo.open_issues_count === 1 ? 'Issue' : 'Issues'}
            </li>
          </ul>
        :
          <span>{pending ? 'Loading...' : 'Stats not available'}</span>
        }
      </div>
    );
  },
};

export default RepoStats;
