// @flow strict

import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';

import app from './app';

const jsErrorHandler = (error: ?Error, isFatal: ?boolean) => {
  console.log('@monitoring js', error, isFatal);
};
// @todo remove
setJSExceptionHandler(jsErrorHandler, true);

const nativeErrorHandler = (error: ?string) => {
  console.log('@monitoring native', error);
};
setNativeExceptionHandler(nativeErrorHandler, true, true);

export default app;
