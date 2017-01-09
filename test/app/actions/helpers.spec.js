import expect from 'expect';
import fetchMock from 'fetch-mock';
import {schema} from 'normalizr';

import {
  createRequest,
} from '../../../app/actions/helpers';

const SOME_ACTION = 'SOME_ACTION';

describe('action helpers', function () {
  describe('#createRequest', function () {
    beforeEach('mock server api', function () {
      fetchMock.get('/api/users', {
        body: [
          {
            id: 1,
            name: 'Some User',
            teams: [
              {
                id: 1,
                name: 'Some Team',
              },
            ],
          },
        ],
      });
    });

    afterEach('restore fetch', function () {
      fetchMock.restore();
    });

    context('when called without action type', function () {
      it('throws missing type error', function () {
        return expect(() => createRequest()).toThrow(/must specify an action type/i);
      });
    });

    context('when called without url', function () {
      it('throws missing url error', function () {
        return expect(() => createRequest(SOME_ACTION)).toThrow(/must specify a url/i);
      });
    });

    context('when called with url', function () {
      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'GET /api/users',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            payload: [
              {
                id: 1,
                name: 'Some User',
                teams: [
                  {
                    id: 1,
                    name: 'Some Team',
                  },
                ],
              },
            ],
            meta: {
              request: {
                id: 'GET /api/users',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with method', function () {
      beforeEach('mock server api', function () {
        fetchMock.post('/api/users', {
          body: [
            {
              id: 1,
              name: 'Some User',
            },
          ],
        });
      });

      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          method: 'POST',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'POST /api/users',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            payload: [
              {
                id: 1,
                name: 'Some User',
              },
            ],
            meta: {
              request: {
                id: 'POST /api/users',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          method: 'POST',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with id', function () {
      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          id: 'something else',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'something else',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            payload: [
              {
                id: 1,
                name: 'Some User',
                teams: [
                  {
                    id: 1,
                    name: 'Some Team',
                  },
                ],
              },
            ],
            meta: {
              request: {
                id: 'something else',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          id: 'something else',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with meta', function () {
      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          meta: {
            silent: true,
          },
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              silent: true,
              request: {
                id: 'GET /api/users',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            payload: [
              {
                id: 1,
                name: 'Some User',
                teams: [
                  {
                    id: 1,
                    name: 'Some Team',
                  },
                ],
              },
            ],
            meta: {
              silent: true,
              request: {
                id: 'GET /api/users',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          meta: {
            silent: true,
          },
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called with schema', function () {
      const userSchema = new schema.Entity('users');
      const teamSchema = new schema.Entity('teams');

      userSchema.define({
        teams: [teamSchema],
      });

      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          schema: [userSchema],
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'GET /api/users',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            payload: {
              result: [1],
              entities: {
                users: {
                  1: {
                    id: 1,
                    name: 'Some User',
                    teams: [1],
                  },
                },
                teams: {
                  1: {
                    id: 1,
                    name: 'Some Team',
                  },
                },
              },
            },
            meta: {
              request: {
                id: 'GET /api/users',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
          schema: [userSchema],
        })).toDispatchFSACompliantActions();
      });
    });

    context('when server returns error', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('/api/users/1', {
          body: {
            message: 'Not Found',
          },
          status: 404,
        });
      });

      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'GET /api/users/1',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            error: true,
            payload: {
              message: 'Not Found',
            },
            meta: {
              request: {
                id: 'GET /api/users/1',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when server returns non-json response', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('/api/users/1', {
          body: 'Error',
          status: 500,
        });
      });

      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'GET /api/users/1',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            error: true,
            payload: {
              message: 'Server Error',
            },
            meta: {
              request: {
                id: 'GET /api/users/1',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when server is not available', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('/api/users/1', {
          throws: new Error(),
        });
      });

      it('creates request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchActions([
          {
            type: SOME_ACTION,
            meta: {
              request: {
                id: 'GET /api/users/1',
                pending: true,
              },
            },
          },
          {
            type: SOME_ACTION,
            error: true,
            payload: {
              message: 'Network Error',
            },
            meta: {
              request: {
                id: 'GET /api/users/1',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users/1',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when request is pending', function () {
      it('does not create request actions', function () {
        return expect(createRequest(SOME_ACTION, {
          url: '/api/users',
        })).withState({
          requests: {
            'GET /api/users': {
              pending: true,
            },
          },
        }).toNotDispatchActions();
      });
    });
  });
});
