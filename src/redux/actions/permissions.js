// @flow strict

import {ANALYTICS_EVENT_TYPE, PERMISSION_STATUS} from '../../const';
import type {PermissionStatus} from '../../types';
import translations from '../../translations';
import type {Options} from '../_types';

export const REQUEST = '@@permissions/REQUEST';
export const CHECK = '@@permissions/CHECK';
export const CHANGE = '@@permissions/CHANGE';

export type PermissionType = 'camera';

export type RequestPayload = {|
  type: PermissionType
|};

export type CheckPayload = {|
  type: PermissionType
|};

export type ChangePayload = {|
  type: PermissionType,
  status: PermissionStatus
|};

export type Action =
  | {|
      type: typeof REQUEST,
      payload: RequestPayload
    |}
  | {|
      type: typeof CHECK,
      payload: CheckPayload
    |}
  | {|
      type: typeof CHANGE,
      payload: ChangePayload
    |};

export const change = (type: PermissionType, status: PermissionStatus): Action => ({
  type: CHANGE,
  payload: {
    type,
    status
  }
});

const _requestPermission = (type: PermissionType, onDeny?: () => void) => async (
  dispatch: Dispatch,
  getState: GetState,
  {services}: Options
): Promise<PermissionStatus> => {
  const status = await services.Permissions.request(type);
  const currentPermissionStatus = getState().permissions[type];

  if (status === PERMISSION_STATUS.DENIED && onDeny) {
    onDeny();
  }
  if (currentPermissionStatus !== status) {
    dispatch(change(type, status));
  }

  services.Analytics.logEvent(ANALYTICS_EVENT_TYPE.PERMISSION, {
    status,
    type
  });

  return status;
};

export const request = (type: PermissionType, description: string, onDeny?: () => void) => async (
  dispatch: Dispatch,
  getState: GetState,
  {services}: Options
): Promise<Action> => {
  const action = dispatch({
    type: REQUEST,
    payload: {
      type
    }
  });

  const permissionStatus = getState().permissions[type];

  if (permissionStatus === PERMISSION_STATUS.DENIED) {
    const canOpenSettings = await services.Permissions.canOpenSettings();
    services.Permissions.alert(
      translations.permission,
      description,
      [
        {text: translations.quit, onPress: onDeny, style: 'cancel'},
        {
          text: canOpenSettings ? translations.openSettings : translations.ok,
          onPress: () =>
            canOpenSettings
              ? services.Permissions.openSettings().then(onDeny)
              : _requestPermission(type, onDeny)(dispatch, getState, {services})
        }
      ],
      {cancelable: false}
    );
  } else {
    await _requestPermission(type, onDeny)(dispatch, getState, {services});
  }

  return action;
};

export const check = (type: PermissionType) => async (
  dispatch: Dispatch,
  getState: GetState,
  {services}: Options
): Promise<Action> => {
  const action = dispatch({
    type: CHECK,
    payload: {
      type
    }
  });

  const status = await services.Permissions.check(type);
  const {permissions} = getState();

  if (permissions[type] !== status) {
    dispatch(change(type, status));
  }

  return action;
};
