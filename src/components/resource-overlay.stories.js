// @flow

import * as React from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import ResourceOverlay from './screen';

storiesOf('ResourceOverlay', module).add('Default', () => (
  <ResourceOverlay>
    <Text>Foo bar baz</Text>
  </ResourceOverlay>
));
