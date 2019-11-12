// @flow

declare module '@react-native-firebase/analytics' {
  declare module.exports: () => {
    setAnalyticsCollectionEnabled: boolean => Promise<void>,
    logEvent: (string, Object) => Promise<void>,
    setCurrentScreen: string => Promise<void>,
    setUserProperties: Object => Promise<void>
  };
}
