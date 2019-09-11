// @flow strict
import {NativeModules} from 'react-native';

import translations from '../../translations';
import type {Config} from './brand';

jest.mock('cross-fetch');
jest.mock('../../utils/local-token', () => {
  const {createToken} = require('../../__fixtures__/tokens');
  const token = createToken({});
  return {
    get: jest.fn(() => Promise.resolve(token))
  };
});

describe('Language', () => {
  describe('fetchLanguage', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should handle invalid token', async () => {
      const localToken = require('../../utils/local-token');
      // $FlowFixMe this function is mocked;
      localToken.get.mockImplementationOnce(() => Promise.resolve(null));

      const {fetchLanguage} = require('./language');
      const result = fetchLanguage();

      await expect(result).rejects.toThrow(new Error('Invalid token'));
    });

    it('should fetch config and keep phone language', async () => {
      const phoneLanguage = translations.getLanguage();
      const fetch = require('cross-fetch');

      fetch.mockImplementationOnce(
        (
          url
        ): Promise<{
          json: () => Promise<Config>
        }> => {
          expect(url).toBe('https://domain.tld/config');

          return Promise.resolve({
            json: () =>
              // $FlowFixMe simplify Config for this test
              Promise.resolve({
                defaultLanguage: 'fr',
                supportedLngs: ['de', phoneLanguage, 'es', 'fr']
              })
          });
        }
      );

      const {fetchLanguage} = require('./language');
      const selectedLanguage = await fetchLanguage();
      return expect(selectedLanguage).toEqual(phoneLanguage);
    });

    it('should fetch config and select plateform language', async () => {
      const fetch = require('cross-fetch');

      fetch.mockImplementationOnce(
        (
          url
        ): Promise<{
          json: () => Promise<Config>
        }> => {
          expect(url).toBe('https://domain.tld/config');

          return Promise.resolve({
            json: () =>
              // $FlowFixMe simplify Config for this test
              Promise.resolve({
                defaultLanguage: 'fr',
                supportedLngs: ['de', 'es', 'fr']
              })
          });
        }
      );

      const {fetchLanguage} = require('./language');
      const selectedLanguage = await fetchLanguage();
      return expect(selectedLanguage).toEqual('fr');
    });

    it('should reject error', () => {
      jest.mock('../../modules/environment', () => ({
        __E2E__: false
      }));
      const fetch = require('cross-fetch');

      fetch.mockImplementationOnce((url, options) => Promise.reject(new Error()));

      const {fetchLanguage} = require('./language');
      const actual = fetchLanguage();

      return expect(actual).rejects.toThrow();
    });

    it('should fetch e2e fixtures', async () => {
      jest.mock('../../modules/environment', () => ({
        __E2E__: true
      }));
      const {fetchLanguage} = require('./language');
      const lang = await fetchLanguage();
      return expect(lang).toEqual('en');
    });

    afterAll(() => {
      jest.resetAllMocks();
    });
  });

  describe('getPlatformMatchingLanguage', () => {
    beforeEach(() => {
      NativeModules.ReactLocalization = {
        language: 'zh-TW'
      };
      jest.resetModules();
    });

    afterAll(() => {
      NativeModules.ReactLocalization = {
        language: 'en-US'
      };
      jest.resetAllMocks();
    });
    it('should return exact matching', () => {
      const {getPlatformMatchingLanguage} = require('./language');

      const result = getPlatformMatchingLanguage(['zh-TW', 'fr', 'de']);
      const expected = 'zh-TW';

      expect(result).toEqual(expected);
    });

    it('should return short matching', () => {
      const {getPlatformMatchingLanguage} = require('./language');

      const result = getPlatformMatchingLanguage(['zh', 'fr', 'de']);
      const expected = 'zh';

      expect(result).toEqual(expected);
    });

    it('should return nothing', () => {
      const {getPlatformMatchingLanguage} = require('./language');

      const result = getPlatformMatchingLanguage(['fr', 'de']);

      expect(result).toBeUndefined();
    });
  });

  describe('getSelectedLanguage', () => {
    it('should return default language', () => {
      const {getSelectedLanguage} = require('./language');

      const result = getSelectedLanguage(['fr', 'en', 'de'], 'en');
      const expected = 'en';

      expect(result).toEqual(expected);
    });

    it('should return matching language', () => {
      const {getSelectedLanguage} = require('./language');

      const result = getSelectedLanguage(['fr', 'en', 'de'], 'en', 'de');
      const expected = 'de';

      expect(result).toEqual(expected);
    });
  });
});
