import {Schema} from 'normalizr';
import {FETCH_REPO} from './constants';
import {createFetchAction} from './helpers';

const repoSchema = new Schema('repos', {
  idAttribute: 'full_name',
});

const userSchema = new Schema('users', {
  idAttribute: 'login',
});

repoSchema.define({
  owner: userSchema,
});

export function fetchRepo(repo = null) {
  if (repo === null) throw new Error('Must specify a repo to fetch');
  if (!/\w+\/\w+/.test(repo)) throw new Error('Must specify repo full name');

  return createFetchAction(FETCH_REPO, {
    id: repo,
    url: `https://api.github.com/repos/${ repo }`,
    schema: repoSchema,
  });
}
