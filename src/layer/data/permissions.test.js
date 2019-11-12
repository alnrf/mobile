// @flow strict

import {PERMISSIONS} from 'react-native-permissions';

import {PERMISSION_TYPE} from '../../const';

describe('permissions', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('request', () => {
    it('should request permission', async () => {
      const {request: _request} = require('react-native-permissions');
      const {request} = require('./permissions');

      await request(PERMISSION_TYPE.CAMERA);

      expect(_request).toHaveBeenCalledTimes(1);
      expect(_request).toHaveBeenCalledWith([PERMISSIONS.IOS.CAMERA]);
    });

    it('should throw error on unhandled permission type', () => {
      const {request: _request} = require('react-native-permissions');
      const {request} = require('./permissions');

      // $FlowFixMe for test purpose
      const result = request('foo');

      expect(result).rejects.toThrow();
      expect(_request).toHaveBeenCalledTimes(0);
    });
  });

  describe('check', () => {
    it('should check permission', async () => {
      const {check: _check} = require('react-native-permissions');
      const {check} = require('./permissions');

      await check(PERMISSION_TYPE.CAMERA);

      expect(_check).toHaveBeenCalledTimes(1);
      expect(_check).toHaveBeenCalledWith([PERMISSIONS.IOS.CAMERA]);
    });

    it('should throw error on unhandled permission type', () => {
      const {check: _check} = require('react-native-permissions');
      const {check} = require('./permissions');

      // $FlowFixMe for test purpose
      const result = check('foo');

      expect(result).rejects.toThrow();
      expect(_check).toHaveBeenCalledTimes(0);
    });
  });

  describe('openSettings', () => {
    it('should open settings', async () => {
      const {openSettings: _openSettings} = require('react-native-permissions');
      const {openSettings} = require('./permissions');

      await openSettings();

      expect(_openSettings).toHaveBeenCalledTimes(1);
    });
  });

  describe('canOpenSettings', () => {
    it('should return value', async () => {
      const {canOpenSettings: _canOpenSettings} = require('react-native-permissions');
      const {canOpenSettings} = require('./permissions');

      const result = await canOpenSettings();

      expect(result).toBeFalsy();
      expect(_canOpenSettings).toHaveBeenCalledTimes(1);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
