// @flow

import type {Middleware, MiddlewareAPI, Dispatch} from 'redux';

import type {ErrorAction} from '../_types';
import type {StoreState} from '../store';

import {ForbiddenError} from '../../models/error';
import {showError} from '../actions/ui/errors';
import {ERROR_TYPE} from '../../const';
import type {Action as DisplayErrorAction} from '../actions/ui/errors';

type Action =
  | ErrorAction<{|
      type: string
    |}>
  | DisplayErrorAction<void>;
type State = StoreState;

const createMiddleware = (): Middleware<State, Action, Dispatch<Action>> => ({
  dispatch,
  getState
}: MiddlewareAPI<State, Action, Dispatch<Action>>) => (
  next: Dispatch<Action>
): Dispatch<Action> => (action: Action) => {
  if (action.payload && action.payload instanceof ForbiddenError) {
    dispatch(
      showError({
        errorType: ERROR_TYPE.PLATFORM_NOT_ACTIVATED
      })
    );
  }

  return next(action);
};

export default createMiddleware;
