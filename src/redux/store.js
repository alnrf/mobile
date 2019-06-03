// @flow strict

import {AsyncStorage} from 'react-native';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {middlewares, reducers as storeReducers} from '@coorpacademy/player-store';
import type {ReduxState} from '@coorpacademy/player-store';

import type {State as NavigationState} from './reducers/navigation';
import navigation from './reducers/navigation';
import type {State as BundleState} from './reducers/bundle';
import type {State as CatalogState} from './reducers/catalog';
import resetOnLogout from './utils/reset-on-logout';

import type {State as PermissionsState} from './reducers/permissions';
import type {State as AuthenticationState} from './reducers/authentication';
import type {State as VideoState} from './reducers/video';
import type {State as GodModeState} from './reducers/godmode';
import type {State as ErrorState} from './reducers/ui/error';
import bundle from './reducers/bundle';
import catalog from './reducers/catalog';
import authentication from './reducers/authentication';
import permissions from './reducers/permissions';
import video from './reducers/video';
import godmode from './reducers/godmode';
import error from './reducers/ui/error';
import Bundle from './middlewares/bundle';
import ResetDisplayedProgression from './middlewares/reset-displayed-progression';
import ProgressionsSynchronization from './middlewares/progressions-synchronization';
import UpdateCardOnProgressionUpdate from './middlewares/update-card-on-progression-update';
import ErrorHandler from './middlewares/error-handler';
import type {Options, ReduxDevTools} from './_types';

export type StoreState = $Exact<{|
  ...$Exact<ReduxState>,
  navigation: NavigationState,
  bundle: BundleState,
  catalog: CatalogState,
  authentication: AuthenticationState,
  permissions: PermissionsState,
  video: VideoState,
  error: ErrorState<void>,
  godmode: GodModeState
|}>;

const {ErrorLogger, ReduxThunkMemoized} = middlewares;
const {data, ui} = storeReducers;

const reducers = combineReducers({
  data: resetOnLogout(data),
  ui: resetOnLogout(ui),
  error,
  navigation,
  bundle: resetOnLogout(bundle),
  catalog: resetOnLogout(catalog),
  authentication: resetOnLogout(authentication),
  permissions,
  video,
  godmode
});

const createMiddlewares = (options: Options, reduxDevTools?: ReduxDevTools) => {
  return compose(
    // $FlowFixMe error applying middlewares with multiple types
    applyMiddleware(
      ReduxThunkMemoized(options),
      ErrorLogger(options),
      Bundle(options),
      ResetDisplayedProgression(options),
      ProgressionsSynchronization(options),
      UpdateCardOnProgressionUpdate(options),
      ErrorHandler()
    ),
    // $FlowFixMe
    reduxDevTools || (f => f)
  );
};
const create = (options: Options, reduxDevTools?: ReduxDevTools) => {
  // $FlowFixMe
  const store = createStore(reducers, {}, createMiddlewares(options, reduxDevTools));
  const persistedStore = persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['bundle']
  });

  return persistedStore;
};

export default create;
