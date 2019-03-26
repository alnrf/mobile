// @flow strict

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {middlewares, reducers as storeReducers} from '@coorpacademy/player-store';
import type {ReduxState} from '@coorpacademy/player-store';

import type {State as NavigationState} from './reducers/navigation';
import navigation from './reducers/navigation';
import type {State as DisciplineBundleState} from './reducers/discipline-bundle';
import type {State as CardsState} from './reducers/cards';
import resetOnLogout from './utils/reset-on-logout';

import type {State as PermissionsState} from './reducers/permissions';
import type {State as AuthenticationState} from './reducers/authentication';
import disciplineBundle from './reducers/discipline-bundle';
import cards from './reducers/cards';
import authentication from './reducers/authentication';
import permissions from './reducers/permissions';
import DisciplineBundle from './middlewares/discipline-bundle';
import ResetDisplayedProgression from './middlewares/reset-displayed-progression';
import ProgressionsSynchronization from './middlewares/progressions-synchronization';
import type {Options, ReduxDevTools} from './_types';

export type StoreState = $Exact<{|
  ...$Exact<ReduxState>,
  navigation: NavigationState,
  disciplineBundle: DisciplineBundleState,
  cards: CardsState,
  authentication: AuthenticationState,
  permissions: PermissionsState
|}>;

const {ErrorLogger, ReduxThunkMemoized} = middlewares;
const {data, ui} = storeReducers;

const reducers = combineReducers({
  data: resetOnLogout(data),
  ui: resetOnLogout(ui),
  navigation,
  disciplineBundle: resetOnLogout(disciplineBundle),
  cards: resetOnLogout(cards),
  authentication: resetOnLogout(authentication),
  permissions
});

const createMiddlewares = (options: Options, reduxDevTools?: ReduxDevTools) => {
  return compose(
    // $FlowFixMe error applying middlewares with multiple types
    applyMiddleware(
      ReduxThunkMemoized(options),
      ErrorLogger(options),
      DisciplineBundle(options),
      ResetDisplayedProgression(options),
      ProgressionsSynchronization(options)
    ),
    // $FlowFixMe
    reduxDevTools || (f => f)
  );
};
const create = (options: Options, reduxDevTools?: ReduxDevTools) =>
  // $FlowFixMe
  createStore(reducers, {}, createMiddlewares(options, reduxDevTools));

export default create;
