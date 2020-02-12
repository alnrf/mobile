// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TestContextProvider, handleFakePress} from '../utils/tests';

import Header from './header';

storiesOf('Header', module)
  .add('Default', () => (
    <TestContextProvider>
      <Header
        height={35}
        onLogoLongPress={handleFakePress}
        onSearchToggle={handleFakePress}
        isSearchFocused={false}
        searchValue=""
        isFetching={false}
        onSearchInputChange={handleFakePress}
        onSearchInputClear={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Searching', () => (
    <TestContextProvider>
      <Header
        height={35}
        onLogoLongPress={handleFakePress}
        onSearchToggle={handleFakePress}
        isSearchFocused
        searchValue=""
        isFetching
        onSearchInputChange={handleFakePress}
        onSearchInputClear={handleFakePress}
      />
    </TestContextProvider>
  ));
