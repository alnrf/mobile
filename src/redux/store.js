// @flow

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {middlewares, reducers as storeReducers} from '@coorpacademy/player-store';
import type {ReduxState} from '@coorpacademy/player-store';

import type {State as NavigationState} from './reducers/navigation';
import navigation from './reducers/navigation';
import type {State as DisciplineBundleState} from './reducers/discipline-bundle';
import type {State as CardsState} from './reducers/cards';
import type {State as AuthenticationState} from './reducers/authentication';
import disciplineBundle from './reducers/discipline-bundle';
import cards from './reducers/cards';
import authentication from './reducers/authentication';
import DisciplineBundle from './middlewares/discipline-bundle';
import type {Options, ReduxDevTools} from './_types';

export type StoreState = $Exact<{|
  ...$Exact<ReduxState>,
  navigation: NavigationState,
  disciplineBundle: DisciplineBundleState,
  cards: CardsState,
  authentication: AuthenticationState
|}>;

const {ErrorLogger, ReduxThunkMemoized} = middlewares;
const {data, ui} = storeReducers;

const reducers = combineReducers({
  data,
  ui,
  navigation,
  disciplineBundle,
  cards,
  authentication
});

const createMiddlewares = (options: Options, reduxDevTools?: ReduxDevTools) => {
  return compose(
    // $FlowFixMe error applying middlewares with multiple types
    applyMiddleware(ReduxThunkMemoized(options), ErrorLogger(options), DisciplineBundle(options)),
    reduxDevTools || (f => f)
  );
};
const create = (options: Options, reduxDevTools?: ReduxDevTools) =>
  createStore(reducers, {}, createMiddlewares(options, reduxDevTools));

export default create;
