import expect from 'expect';
import fetchMock from 'fetch-mock';

import {
  fetchEntity,
  fetchEntityAndShowMessage,
} from '../../../app/actions/entity';

import {
  FETCH_ENTITY,
  SHOW_MESSAGE,
} from '../../../app/actions/constants';

describe('entity actions', function () {
  afterEach('restore fetch', function () {
    fetchMock.restore();
  });

  describe('#fetchEntity', function () {
    context('when called without entity', function () {
      it('throws unknown entity error', function () {
        return expect(() => fetchEntity()).toThrow(/must specify a known entity/i);
      });
    });

    context('when called for repo', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('https://api.github.com/repos/someUser/someRepo', {
          body: {
            name: 'someRepo',
            full_name: 'someUser/someRepo',
            owner: {
              login: 'someUser',
            },
            forks_count: 1,
            stargazer_count: 2,
            open_issue_count: 3,
          },
        });
      });

      it('creates fetch entity actions', function () {
        return expect(fetchEntity('repo', {
          id: 'someUser/someRepo',
        })).toDispatchActions([
          {
            type: FETCH_ENTITY,
            meta: {
              request: {
                id: 'fetch_repo_someUser/someRepo',
                pending: true,
              },
            },
          },
          {
            type: FETCH_ENTITY,
            payload: {
              result: 'someUser/someRepo',
              entities: {
                repos: {
                  'someUser/someRepo': {
                    name: 'someRepo',
                    full_name: 'someUser/someRepo',
                    owner: 'someUser',
                    forks_count: 1,
                    stargazer_count: 2,
                    open_issue_count: 3,
                  },
                },
                users: {
                  someUser: {
                    login: 'someUser',
                  },
                },
              },
            },
            meta: {
              request: {
                id: 'fetch_repo_someUser/someRepo',
                completed: true,
              },
            },
          },
        ]);
      });

      it('creates FSA compliant actions', function () {
        return expect(fetchEntity('repo', {
          id: 'someUser/someRepo',
        })).toDispatchFSACompliantActions();
      });
    });
  });

  describe('#fetchEntityAndShowMessage', function () {
    context('when called without entity', function () {
      it('throws unknown entity error', function () {
        return expect(() => fetchEntityAndShowMessage()).toThrow(/must specify a known entity/i);
      });
    });

    context('when called for repo', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('https://api.github.com/repos/someUser/someRepo', {
          body: {
            full_name: 'someUser/someRepo',
          },
        });
      });

      it('creates fetch entity actions', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/someRepo',
        })).toDispatchActions([
          fetchEntity('repo', {
            id: 'someUser/someRepo',
          }),
        ]);
      });

      it('does not create show message action', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/someRepo',
        })).toNotDispatchAction({
          type: SHOW_MESSAGE,
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/someRepo',
        })).toDispatchFSACompliantActions();
      });
    });

    context('when called for repo and server returns error', function () {
      beforeEach('mock server api', function () {
        fetchMock.get('https://api.github.com/repos/someUser/otherRepo', {
          body: {
            message: 'Not Found',
          },
          status: 404,
        });
      });

      it('creates fetch entity actions', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/otherRepo',
        })).toDispatchActions([
          fetchEntity('repo', {
            id: 'someUser/otherRepo',
          }),
        ]);
      });

      it('creates show message action', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/otherRepo',
        })).toDispatchAction({
          type: SHOW_MESSAGE,
          payload: {
            body: /failed to fetch repo/i,
            type: 'error',
          },
        });
      });

      it('creates FSA compliant actions', function () {
        return expect(fetchEntityAndShowMessage('repo', {
          id: 'someUser/otherRepo',
        })).toDispatchFSACompliantActions();
      });
    });
  });
});
