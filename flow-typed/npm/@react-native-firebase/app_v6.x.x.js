// @flow

declare module '@react-native-firebase/app' {
  declare type Utils = {
    errorOnMissingPlayServices?: boolean,
    promptOnMissingPlayServices?: boolean
  };

  declare export function utils(): Utils;

  declare module.exports: {
    utils: () => Utils
  };
}
