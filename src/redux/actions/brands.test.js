// @flow strict

import {fakeError} from '../../utils/tests';
import {createBrand} from '../../__fixtures__/brands';

import {fetchRequest, fetchSuccess, fetchError, fetchBrand} from './brands';

const brand = createBrand();

describe('Brands', () => {
  describe('fetchBrand', () => {
    it('success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Brands: {
            find: jest.fn()
          }
        }
      };

      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchRequest());
        return action;
      });
      dispatch.mockImplementationOnce(action => {
        expect(action).toEqual(fetchSuccess(brand));
        return action;
      });
      options.services.Brands.find.mockReturnValueOnce(Promise.resolve(brand));

      // $FlowFixMe
      const actual = await fetchBrand('__TOKEN__')(dispatch, getState, options);
      return expect(actual).toEqual(fetchSuccess(brand));
    });

    it('token is missing', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Brands: {
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
      const actual = await fetchBrand()(dispatch, getState, options);

      expect(options.services.Brands.find).not.toHaveBeenCalled();
      return expect(actual).toEqual(fetchError(new Error('Token not defined')));
    });

    it('error on fetch failure', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn();
      const options = {
        services: {
          Brands: {
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
      options.services.Brands.find.mockImplementationOnce(Promise.reject(fakeError));

      // $FlowFixMe
      const actual = await fetchBrand('__TOKEN__')(dispatch, getState, options);
      return expect(actual).toEqual(fetchError(fakeError));
    });
  });
});
