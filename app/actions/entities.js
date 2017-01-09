import {schema} from 'normalizr';

export const repo = {
  url: 'https://api.github.com/repos',
  schema: new schema.Entity('repos', {
    owner: new schema.Entity('users', {}, {
      idAttribute: 'login',
    }),
  }, {
    idAttribute: 'full_name',
  }),
  plural: 'repos',
};
