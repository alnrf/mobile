// @flow strict

import {Platform} from 'react-native';
import {PERMISSIONS, request as _request, check as _check} from 'react-native-permissions';

import {PERMISSION_TYPE} from '../../const';
import {PermissionType} from '../../types';

const CAMERA_PERMISSION = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA
});

const getPlatformPermission = (
  type: PermissionType
): $Values<PERMISSIONS.IOS> | $Values<PERMISSIONS.ANDROID> => {
  switch (type) {
    case PERMISSION_TYPE.CAMERA:
      return CAMERA_PERMISSION;
    default:
      throw new Error('Unhandled permission type request');
  }
};

export const request = (type: PermissionType) => _request(getPlatformPermission(type));
export const check = (type: PermissionType) => _check(getPlatformPermission(type));

export {openSettings, canOpenSettings} from 'react-native-permissions';
