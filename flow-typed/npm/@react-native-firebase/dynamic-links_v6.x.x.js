// @flow

declare module '@react-native-firebase/dynamic-links' {
  declare export type DynamicLink = {|
    url: string,
    minimumAppVersion: number | string | null
  |};

  declare export type LinkSubcriber = () => void;

  declare module.exports: () => {
    getInitialLink: () => Promise<?DynamicLink>,
    onLink: (DynamicLink => any) => LinkSubcriber
  };
}
