// @flow strict

import type {ErrorType} from '../../../types';
import type {StoreAction} from '../../_types';

export const SHOW = '@@error/SHOW';
export const HIDE = '@@error/HIDE';

export type Action<T> =
  | {|
      type: '@@error/SHOW',
      payload: {
        errorType: ErrorType,
        lastAction?: () => StoreAction<T>
      }
    |}
  | {|
      type: '@@error/HIDE'
    |};

export const showError = <T>({
  errorType,
  lastAction
}: {
  errorType: ErrorType,
  lastAction?: () => StoreAction<T>
}): Action<T> => ({
  type: SHOW,
  payload: {
    errorType,
    lastAction
  }
});

export const hideError = <T>(): Action<T> => ({
  type: HIDE
});

export const refresh = <T>(): StoreAction<Action<T>> => {
  return (dispatch, getState) => {
    const {error} = getState();
    if (error.lastAction) {
      dispatch(error.lastAction());
    }

    return dispatch(hideError());
  };
};
