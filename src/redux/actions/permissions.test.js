// @flow strict

import {ANALYTICS_EVENT_TYPE, PERMISSION_STATUS, PERMISSION_TYPE} from '../../const';
import type {PermissionStatus} from '../../types';
import translations from '../../translations';
import {createFakeAnalytics} from '../../utils/tests';
import type {Action} from './permissions';
import {check, request, change, CHECK, REQUEST, CHANGE} from './permissions';

const createStore = (status: PermissionStatus) => ({
  getState: jest.fn(() => ({permissions: {camera: status}})),
  dispatch: jest.fn()
});

describe('Permissions', () => {
  it('change', () => {
    const result = change(PERMISSION_TYPE.CAMERA, PERMISSION_STATUS.GRANTED);
    const expected: Action = {
      type: CHANGE,
      payload: {
        type: PERMISSION_TYPE.CAMERA,
        status: PERMISSION_STATUS.GRANTED
      }
    };
    expect(result).toEqual(expected);
  });

  describe('check', () => {
    const expected: Action = {
      type: CHECK,
      payload: {
        type: PERMISSION_TYPE.CAMERA
      }
    };

    it('with change', async () => {
      const {getState, dispatch} = createStore(PERMISSION_STATUS.DENIED);
      const services = {
        Permissions: {
          check: jest.fn(() => Promise.resolve(PERMISSION_STATUS.DENIED))
        }
      };
      // $FlowFixMe we dont want to mock the entire services object
      await check(PERMISSION_TYPE.CAMERA)(dispatch, getState, {services});
      const expectedChangeAction: Action = {
        type: CHANGE,
        payload: {
          type: PERMISSION_TYPE.CAMERA,
          status: PERMISSION_STATUS.DENIED
        }
      };
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0]).toEqual([expected]);
      expect(dispatch.mock.calls[1]).toEqual([expectedChangeAction]);
      expect(services.Permissions.check.mock.calls.length).toBe(1);
      expect(services.Permissions.check.mock.calls[0]).toEqual([PERMISSION_TYPE.CAMERA]);
    });

    it('without change', async () => {
      const {getState, dispatch} = createStore(PERMISSION_STATUS.GRANTED);
      const services = {
        Permissions: {
          check: jest.fn(() => Promise.resolve(PERMISSION_STATUS.GRANTED))
        }
      };
      // $FlowFixMe we dont want to mock the entire services object
      await check(PERMISSION_TYPE.CAMERA)(dispatch, getState, {services});
      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls[0]).toEqual([expected]);
      expect(services.Permissions.check.mock.calls.length).toBe(1);
      expect(services.Permissions.check.mock.calls[0]).toEqual([PERMISSION_TYPE.CAMERA]);
    });
  });

  describe('request', () => {
    const expected: Action = {
      type: REQUEST,
      payload: {
        type: PERMISSION_TYPE.CAMERA
      }
    };

    describe('should handle request', () => {
      it('with deny callback and change', async () => {
        const {getState, dispatch} = createStore(PERMISSION_STATUS.DENIED);
        const handleDeny = jest.fn();
        const services = {
          Analytics: createFakeAnalytics(),
          Permissions: {
            request: jest.fn(() => Promise.resolve(PERMISSION_STATUS.DENIED))
          }
        };
        // $FlowFixMe we dont want to mock the entire services object
        await request(PERMISSION_TYPE.CAMERA, 'foo bar baz', handleDeny)(dispatch, getState, {
          services
        });
        const expectedChangeAction: Action = {
          type: CHANGE,
          payload: {
            type: PERMISSION_TYPE.CAMERA,
            status: PERMISSION_STATUS.DENIED
          }
        };
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[0]).toEqual([expected]);
        expect(dispatch.mock.calls[1]).toEqual([expectedChangeAction]);
        expect(handleDeny.mock.calls.length).toBe(1);
        expect(services.Permissions.request.mock.calls.length).toBe(1);
        expect(services.Permissions.request.mock.calls[0]).toEqual([PERMISSION_TYPE.CAMERA]);

        expect(services.Analytics.logEvent).toHaveBeenCalledWith(ANALYTICS_EVENT_TYPE.PERMISSION, {
          type: PERMISSION_TYPE.CAMERA,
          status: PERMISSION_STATUS.DENIED
        });
      });

      it('without deny callback and no change', async () => {
        const {getState, dispatch} = createStore(PERMISSION_STATUS.DENIED);
        const handleDeny = jest.fn();
        const services = {
          Analytics: createFakeAnalytics(),
          Permissions: {
            request: jest.fn(() => Promise.resolve(PERMISSION_STATUS.DENIED))
          }
        };
        // $FlowFixMe we dont want to mock the entire services object
        await request(PERMISSION_TYPE.CAMERA, 'foo bar baz', handleDeny)(dispatch, getState, {
          services
        });
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([expected]);
        expect(handleDeny.mock.calls.length).toBe(0);
        expect(services.Permissions.request.mock.calls.length).toBe(1);
        expect(services.Permissions.request.mock.calls[0]).toEqual([PERMISSION_TYPE.CAMERA]);

        expect(services.Analytics.logEvent).toHaveBeenCalledWith(ANALYTICS_EVENT_TYPE.PERMISSION, {
          type: PERMISSION_TYPE.CAMERA,
          status: PERMISSION_STATUS.DENIED
        });
      });
    });

    describe('should handle alert after a deny', () => {
      it('can open settings', async () => {
        const {getState, dispatch} = createStore(PERMISSION_STATUS.DENIED);
        const handleDeny = jest.fn();
        const services = {
          Analytics: createFakeAnalytics(),
          Permissions: {
            canOpenSettings: jest.fn(() => Promise.resolve(true)),
            openSettings: jest.fn(() => Promise.resolve(undefined)),
            alert: jest.fn(),
            request: jest.fn(() => Promise.resolve(PERMISSION_STATUS.DENIED))
          }
        };
        // $FlowFixMe we dont want to mock the entire services object
        await request(PERMISSION_TYPE.CAMERA, 'foo bar baz', handleDeny)(dispatch, getState, {
          services
        });
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([expected]);
        expect(services.Permissions.canOpenSettings.mock.calls.length).toBe(1);
        expect(services.Permissions.alert.mock.calls.length).toBe(1);
        expect(services.Permissions.alert.mock.calls[0]).toEqual([
          translations.permission,
          'foo bar baz',
          [
            {onPress: handleDeny, style: 'cancel', text: translations.quit},
            {onPress: expect.any(Function), text: translations.openSettings}
          ],
          {cancelable: false}
        ]);
        // $FlowFixMe
        const onPressResult = await services.Permissions.alert.mock.calls[0][2][1].onPress();
        expect(services.Permissions.request.mock.calls.length).toBe(0);
        expect(onPressResult).toEqual(undefined);
      });

      it('can not open settings', async () => {
        const {getState, dispatch} = createStore(PERMISSION_STATUS.DENIED);
        const handleDeny = jest.fn();
        const services = {
          Analytics: createFakeAnalytics(),
          Permissions: {
            canOpenSettings: jest.fn(() => Promise.resolve(false)),
            openSettings: jest.fn(() => Promise.resolve(undefined)),
            alert: jest.fn(),
            request: jest.fn(() => Promise.resolve(PERMISSION_STATUS.DENIED))
          }
        };
        // $FlowFixMe we dont want to mock the entire services object
        await request(PERMISSION_TYPE.CAMERA, 'foo bar baz', handleDeny)(dispatch, getState, {
          services
        });
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([expected]);
        expect(services.Permissions.canOpenSettings.mock.calls.length).toBe(1);
        expect(services.Permissions.alert.mock.calls.length).toBe(1);
        expect(services.Permissions.alert.mock.calls[0]).toEqual([
          translations.permission,
          'foo bar baz',
          [
            {onPress: handleDeny, style: 'cancel', text: translations.quit},
            {onPress: expect.any(Function), text: translations.ok}
          ],
          {cancelable: false}
        ]);
        // $FlowFixMe
        const onPressResult = await services.Permissions.alert.mock.calls[0][2][1].onPress();
        expect(services.Permissions.request.mock.calls.length).toBe(1);
        expect(onPressResult).toEqual(PERMISSION_STATUS.DENIED);
      });
    });
  });
});
