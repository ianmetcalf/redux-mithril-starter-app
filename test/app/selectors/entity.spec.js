import expect from 'expect';
import freeze from 'deep-freeze';
import {getEntities, getEntitiesWhere, getEntityById} from '../../../app/selectors/entity';

describe('entity selectors', function () {
  describe('#getEntities', function () {
    context('when called without key', function () {
      it('throws missing key error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntities(state)).toThrow(/must specify a key/i);
      });
    });

    context('when called with key', function () {
      it('returns the entities if they exist', function () {
        const state = freeze({
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Some User',
              },
              2: {
                id: 2,
                name: 'Another User',
              },
            },
          },
        });

        expect(getEntities(state, 'users')).toEqual([
          {
            id: 1,
            name: 'Some User',
          },
          {
            id: 2,
            name: 'Another User',
          },
        ]);
      });

      it('returns empty list if key does not exist', function () {
        const state = freeze({
          entities: {},
        });

        expect(getEntities(state, 'users')).toEqual([]);
      });
    });
  });

  describe('#getEntitiesWhere', function () {
    context('when called without key', function () {
      it('throws missing key error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntitiesWhere(state)).toThrow(/must specify a key/i);
      });
    });

    context('when called without criteria', function () {
      it('returns all entities', function () {
        const state = freeze({
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Some User',
              },
              2: {
                id: 2,
                name: 'Another User',
              },
            },
          },
        });

        expect(getEntitiesWhere(state, 'users')).toEqual([
          {
            id: 1,
            name: 'Some User',
          },
          {
            id: 2,
            name: 'Another User',
          },
        ]);
      });
    });

    context('when called with criteria', function () {
      it('returns entities that match', function () {
        const state = freeze({
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Some User',
              },
              2: {
                id: 2,
                name: 'Another User',
              },
            },
          },
        });

        expect(getEntitiesWhere(state, 'users', {name: 'Some User'})).toEqual([
          {
            id: 1,
            name: 'Some User',
          },
        ]);
      });
    });
  });

  describe('#getEntityById', function () {
    context('when called without key', function () {
      it('throws missing key error', function () {
        const state = freeze({
          entities: {},
        });

        expect(() => getEntityById(state)).toThrow(/must specify a key/i);
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
              1: {
                id: 1,
                name: 'Some User',
              },
              2: {
                id: 2,
                name: 'Another User',
              },
            },
          },
        });

        expect(getEntityById(state, 'users', 1)).toEqual({
          id: 1,
          name: 'Some User',
        });
      });

      it('returns null if key does not exist', function () {
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
