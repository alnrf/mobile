// @flow

import * as React from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import {createUser} from '../__fixtures__/user';
import {CONTENT_TYPE, ENGINE} from '../const';
import {createProgression} from '../__fixtures__/progression';
import {createStoreState, createAuthenticationState} from '../__fixtures__/store';
import {__TEST__} from '../modules/environment';
import {
  UserContext,
  Component as UserProvider,
  mapStateToProps,
  initialState
} from './user-provider';

const user = createUser();

storiesOf('BrandThemeProvider', module).add('Default', () => (
  <UserProvider user={user}>
    <UserContext.Consumer>
      {providedUser => (
        <React.Fragment>
          <Text>FamilyName: {providedUser.familyName}</Text>
          <Text>GivenName: {providedUser.givenName}</Text>
          <Text>DisplayName: {providedUser.displayName}</Text>
        </React.Fragment>
      )}
    </UserContext.Consumer>
  </UserProvider>
));

if (__TEST__) {
  describe('mapStateToProps', () => {
    it('should return the user from state', () => {
      const progression = createProgression({
        engine: ENGINE.MICROLEARNING,
        progressionContent: {
          type: CONTENT_TYPE.LEVEL,
          ref: ''
        }
      });

      const state = createStoreState({
        levels: [],
        disciplines: [],
        chapters: [],
        slides: [],
        progression,
        authentication: createAuthenticationState({user})
      });

      const result = mapStateToProps(state);
      expect(result).toEqual(user);
    });

    it('should return the initial state', () => {
      const progression = createProgression({
        engine: ENGINE.MICROLEARNING,
        progressionContent: {
          type: CONTENT_TYPE.LEVEL,
          ref: ''
        }
      });
      const state = createStoreState({
        levels: [],
        disciplines: [],
        chapters: [],
        slides: [],
        progression,
        authentication: createAuthenticationState({user: null})
      });

      const result = mapStateToProps(state);
      expect(result).toEqual(initialState);
    });
  });
}