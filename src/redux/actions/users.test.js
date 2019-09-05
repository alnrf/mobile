// @flow strict

import {fakeError} from '../../utils/tests';
import {createUser} from '../../__fixtures__/user';
import {fetchRequest, fetchSuccess, fetchError, fetchUser, fetchLoggedUser} from './users';

const user = createUser();

describe('Users', () => {
  describe('fetchUser', () => {
    it('success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Users: {
            find: jest.fn()
          }
        }
      };

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchSuccess(user));
        return action;
      });
      options.services.Users.find.mockReturnValueOnce(Promise.resolve(user));

      // $FlowFixMe
      const actual = await fetchUser('__TOKEN__')(dispatch, getState, options);
      return expect(actual).toEqual(fetchSuccess(user));
    });

    it('token is missing', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Users: {
            find: jest.fn()
          }
        }
      };

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchError(new Error('Token not defined')));
        return action;
      });

      // $FlowFixMe
      const actual = await fetchUser()(dispatch, getState, options);

      expect(options.services.Users.find).not.toHaveBeenCalled();
      return expect(actual).toEqual(fetchError(new Error('Token not defined')));
    });

    it('error on fetch failure', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Users: {
            find: jest.fn()
          }
        }
      };

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchError(fakeError));
        return action;
      });

      // $FlowFixMe
      options.services.Users.find.mockImplementationOnce(Promise.reject(fakeError));

      // $FlowFixMe
      const actual = await fetchUser('__TOKEN__')(dispatch, getState, options);
      return expect(actual).toEqual(fetchError(fakeError));
    });
  });

  describe('fetchLoggedUser', () => {
    it('success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Users: {
            find: jest.fn()
          }
        }
      };

      const token = '__TOKEN__';

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchSuccess(user));
        return action;
      });
      getState.mockReturnValueOnce({authentication: {user: {token, isGodModeUser: false}}});
      options.services.Users.find.mockReturnValueOnce(Promise.resolve(user));

      // $FlowFixMe
      const actual = await fetchLoggedUser()(dispatch, getState, options);
      return expect(actual).toEqual(fetchSuccess(user));
    });

    it('error', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Users: {
            find: jest.fn()
          }
        }
      };

      const token = null;

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchError(new Error('Token not defined')));
        return action;
      });
      getState.mockReturnValueOnce({authentication: {user: {token, isGodModeUser: false}}});

      // $FlowFixMe
      const actual = await fetchLoggedUser()(dispatch, getState, options);

      expect(options.services.Users.find).not.toHaveBeenCalled();
      return expect(actual).toEqual(fetchError(new Error('Token not defined')));
    });
  });
});
