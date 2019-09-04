// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {handleFakePress} from '../utils/tests';
import HeaderSlideRight from './header-slide-right';

storiesOf('HeaderSlideRight', module)
  .add('Default', () => (
    <HeaderSlideRight onPress={handleFakePress} onLongPress={handleFakePress} count={3} />
  ))
  .add('God mode', () => (
    <HeaderSlideRight
      isGodModeEnabled
      onPress={handleFakePress}
      onLongPress={handleFakePress}
      count={3}
    />
  ))
  .add('Fast slide', () => (
    <HeaderSlideRight
      isFastSlideEnabled
      onPress={handleFakePress}
      onLongPress={handleFakePress}
      count={3}
    />
  ))
  .add('God mode + fast slide', () => (
    <HeaderSlideRight
      isGodModeEnabled
      isFastSlideEnabled
      onPress={handleFakePress}
      onLongPress={handleFakePress}
      count={3}
    />
  ));
