// @flow strict

import {
  setJSExceptionHandler,
  getJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler';

import app from './app';

const currentHandler = getJSExceptionHandler();

const jsErrorHandler = (error: Error, isFatal: boolean) => {
  console.log('@monitoring', error, isFatal);
  currentHandler(error, isFatal);
};
setJSExceptionHandler(jsErrorHandler);

const nativeErrorHandler = (error: string) => {
  console.log('@monitoring', error);
};
setNativeExceptionHandler(nativeErrorHandler, true, true);

export default app;
