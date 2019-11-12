// @flow strict

import type {DataLayer} from '../layer/data';

export type PermissionsService = {|
  request: $PropertyType<DataLayer, 'requestPermission'>,
  check: $PropertyType<DataLayer, 'checkPermission'>,
  openSettings: $PropertyType<DataLayer, 'openSettings'>,
  canOpenSettings: $PropertyType<DataLayer, 'canOpenSettings'>,
  alert: $PropertyType<DataLayer, 'alert'>
|};

const service = (dataLayer: DataLayer): PermissionsService => ({
  request: dataLayer.requestPermission,
  check: dataLayer.checkPermission,
  canOpenSettings: dataLayer.canOpenSettings,
  openSettings: dataLayer.openSettings,
  alert: dataLayer.alert
});

export default service;
