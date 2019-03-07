// @flow

import * as React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import Screen from './screen';

const fakeStyle = StyleSheet.create({
  screen: {
    backgroundColor: 'red'
  }
});

const handleRef = (element: ScrollView) => {};

storiesOf('Screen', module)
  .add('Default', () => (
    <Screen testID="fake-screen" onRef={handleRef}>
      <Text>Foo bar baz</Text>
    </Screen>
  ))
  .add('Without safeArea', () => (
    <Screen testID="fake-screen" onRef={handleRef} noSafeArea>
      <Text>Foo bar baz</Text>
    </Screen>
  ))
  .add('Not scrollable', () => (
    <Screen noScroll testID="fake-screen" onRef={handleRef}>
      <Text>Foo bar baz</Text>
    </Screen>
  ))
  .add('Not scrollable without safeArea', () => (
    <Screen noScroll testID="fake-screen" onRef={handleRef} noSafeArea>
      <Text>Foo bar baz</Text>
    </Screen>
  ))
  .add('With custom style', () => (
    <Screen style={fakeStyle.screen} testID="fake-screen" onRef={handleRef}>
      <Text>Foo bar baz</Text>
    </Screen>
  ));
