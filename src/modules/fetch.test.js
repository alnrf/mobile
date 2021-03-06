// @flow

import {Response} from 'node-fetch';

import {ForbiddenError} from '../models/error';
import {ERROR_MESSAGE} from './fetch';

describe('Fetch', () => {
  beforeEach(async () => {
    await jest.resetModules();
  });

  afterAll(async () => {
    await jest.resetAllMocks();
  });
  it('should return response if succeed', async () => {
    jest.mock('cross-fetch');
    const _fetch = require('cross-fetch');
    const response = new Response();

    _fetch.mockImplementationOnce(url => {
      expect(url).toBe('https://domain.tld?foo=bar');

      return Promise.resolve(response);
    });

    const fetch = require('./fetch').default;

    const result = await fetch('https://domain.tld?foo=bar');

    expect(result).toEqual(response);
  });

  it('should throw a regular error if 403 status ', () => {
    jest.mock('cross-fetch');
    const _fetch = require('cross-fetch');

    _fetch.mockImplementationOnce(url => {
      expect(url).toBe('https://domain.tld?foo=qux');
      const response = {status: 403, json: () => {}};
      return Promise.resolve(response);
    });

    const fetch = require('./fetch').default;

    const result = fetch('https://domain.tld?foo=qux');

    expect(result).rejects.toThrow(Error);
  });

  it('should throw a ForbiddenError if 403 status code and error message match ', () => {
    jest.mock('cross-fetch');
    const _fetch = require('cross-fetch');

    _fetch.mockImplementationOnce(url => {
      expect(url).toBe('https://domain.tld?foo=qux');
      const response = {
        status: 403,
        json: () => {
          return {
            err: ERROR_MESSAGE
          };
        }
      };
      return Promise.resolve(response);
    });

    const fetch = require('./fetch').default;

    const result = fetch('https://domain.tld?foo=qux');

    expect(result).rejects.toThrow(ForbiddenError);
  });

  it('headers should have X-Requested-With by default', async () => {
    jest.mock('cross-fetch');
    const _fetch = require('cross-fetch');

    const expectedHeader = {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Coorpacademy Mobile/0.0.0 CFNetwork/897.15 Darwin/17.5.0 (iPhone iOS/12.2)'
    };

    const response = new Response();

    _fetch.mockImplementationOnce((url, options) => {
      expect(url).toBe('https://domain.tld?foo=qux');
      expect(options).toEqual({headers: expectedHeader, method: 'POST'});

      return Promise.resolve(response);
    });
    const fetch = require('./fetch').default;
    const result = await fetch('https://domain.tld?foo=qux', {method: 'POST'});
    expect(result).toEqual(response);
  });
  it('headers should have Android User-Agent', async () => {
    jest.mock('cross-fetch');
    jest.mock('react-native-device-info', () => ({
      getBrand: jest.fn(() => Promise.resolve('Samsung')),
      getModel: jest.fn(() => Promise.resolve('SM-9000')),
      getSystemVersion: jest.fn(() => Promise.resolve('5.1.1'))
    }));
    jest.mock('react-native', () => ({
      Platform: {
        OS: 'android'
      }
    }));

    const _fetch = require('cross-fetch');
    const expectedHeader = {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent':
        'Coorpacademy Mobile/0.0.0 CFNetwork/897.15 Dalvik/2.1.0 (Linux; Samsung SM-9000; Android 5.1.1)'
    };

    const response = new Response();

    _fetch.mockImplementationOnce((url, options) => {
      expect(url).toBe('https://domain.tld?foo=qux');
      expect(options).toEqual({headers: expectedHeader, method: 'POST'});

      return Promise.resolve(response);
    });
    const fetch = require('./fetch').default;
    const result = await fetch('https://domain.tld?foo=qux', {method: 'POST'});
    expect(result).toEqual(response);
  });
});
