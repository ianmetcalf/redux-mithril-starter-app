import expect from 'expect';
import freeze from 'deep-freeze';

import {
  getEntities,
  getEntityById,
} from '../../../app/selectors/entity';

describe('entity selectors', function () {
  describe('#getEntities', function () {
    context('when called without entity', function () {
      it('throws missing entity error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntities(state)).toThrow(/must specify an entity/i);
      });
    });

    context('when called with entity that does not exist', function () {
      it('returns empty list', function () {
        const state = freeze({
          entities: {},
        });

        expect(getEntities(state, 'users')).toEqual([]);
      });
    });

    context('when called with entity that exists', function () {
      it('returns the entities', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User'},
              2: {id: 2, name: 'Another User'},
            },
          },
        });

        expect(getEntities(state, 'users')).toEqual([
          {id: 1, name: 'Some User'},
          {id: 2, name: 'Another User'},
        ]);
      });
    });

    context('when called with limit option', function () {
      it('returns entities up to limit', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User'},
              2: {id: 2, name: 'Other User'},
              3: {id: 3, name: 'Another User'},
            },
          },
        });

        expect(getEntities(state, 'users', {limit: 2})).toEqual([
          {id: 1, name: 'Some User'},
          {id: 2, name: 'Other User'},
        ]);
      });
    });

    context('when called with where option', function () {
      it('returns entities that match', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User', type: 'admin'},
              2: {id: 2, name: 'Other User', type: 'default'},
              3: {id: 3, name: 'Another User', type: 'admin'},
            },
          },
        });

        expect(getEntities(state, 'users', {
          where: {
            type: 'admin',
          },
        })).toEqual([
          {id: 1, name: 'Some User', type: 'admin'},
          {id: 3, name: 'Another User', type: 'admin'},
        ]);
      });

      it('returns entities that match up to limit', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User', type: 'admin'},
              2: {id: 2, name: 'Other User', type: 'default'},
              3: {id: 3, name: 'Another User', type: 'admin'},
            },
          },
        });

        expect(getEntities(state, 'users', {
          where: {
            type: 'admin',
          },
          limit: 1,
        })).toEqual([
          {id: 1, name: 'Some User', type: 'admin'},
        ]);
      });
    });

    context('when called with order option', function () {
      it('returns entities ordered by key', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User', type: 'admin'},
              2: {id: 2, name: 'Other User', type: 'default'},
              3: {id: 3, name: 'Another User', type: 'admin'},
            },
          },
        });

        expect(getEntities(state, 'users', {
          order: 'name',
        })).toEqual([
          {id: 3, name: 'Another User', type: 'admin'},
          {id: 2, name: 'Other User', type: 'default'},
          {id: 1, name: 'Some User', type: 'admin'},
        ]);
      });

      it('returns entities ordered by multiple keys', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User', type: 'admin'},
              2: {id: 2, name: 'Other User', type: 'default'},
              3: {id: 3, name: 'Another User', type: 'admin'},
            },
          },
        });

        expect(getEntities(state, 'users', {
          order: ['type', 'name'],
        })).toEqual([
          {id: 3, name: 'Another User', type: 'admin'},
          {id: 1, name: 'Some User', type: 'admin'},
          {id: 2, name: 'Other User', type: 'default'},
        ]);
      });

      it('returns entities ordered by multiple key directions', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User', type: 'admin'},
              2: {id: 2, name: 'Other User', type: 'default'},
              3: {id: 3, name: 'Another User', type: 'admin'},
            },
          },
        });

        expect(getEntities(state, 'users', {
          order: [['type', 'asc'], ['name', 'desc']],
        })).toEqual([
          {id: 1, name: 'Some User', type: 'admin'},
          {id: 3, name: 'Another User', type: 'admin'},
          {id: 2, name: 'Other User', type: 'default'},
        ]);
      });
    });
  });

  describe('#getEntityById', function () {
    context('when called without entity', function () {
      it('throws missing entity error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntityById(state)).toThrow(/must specify an entity/i);
      });
    });

    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntityById(state, 'users')).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns the entity if it exists', function () {
        const state = freeze({
          entities: {
            users: {
              1: {id: 1, name: 'Some User'},
              2: {id: 2, name: 'Another User'},
            },
          },
        });

        expect(getEntityById(state, 'users', 1)).toEqual({id: 1, name: 'Some User'});
      });

      it('returns null if entity does not exist', function () {
        const state = freeze({
          entities: {},
        });

        expect(getEntityById(state, 'users', 1)).toEqual(null);
      });

      it('returns null if entity does not exist', function () {
        const state = freeze({
          entities: {
            users: {},
          },
        });

        expect(getEntityById(state, 'users', 1)).toEqual(null);
      });
    });
  });
});
