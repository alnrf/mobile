// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';
import {storiesOf} from '@storybook/react-native';

import {TestContextProvider, handleFakePress} from '../utils/tests';
import {__TEST__} from '../modules/environment';

import Header from './header';

storiesOf('Header', module)
  .add('Default', () => (
    <TestContextProvider>
      <Header
        height={67}
        onSearchToggle={handleFakePress}
        onSearchInputChange={handleFakePress}
        onLogoLongPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Focused', () => (
    <TestContextProvider>
      <Header
        height={67}
        isSearchFocused
        onSearchToggle={handleFakePress}
        onSearchInputChange={handleFakePress}
        onLogoLongPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('With search value', () => (
    <TestContextProvider>
      <Header
        height={67}
        searchValue="Foo"
        isSearchFocused
        onSearchToggle={handleFakePress}
        onSearchInputChange={handleFakePress}
        onLogoLongPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Searching', () => (
    <TestContextProvider>
      <Header
        height={67}
        searchValue="Foo"
        isSearchFocused
        isSearchFetching
        onSearchToggle={handleFakePress}
        onSearchInputChange={handleFakePress}
        onLogoLongPress={handleFakePress}
      />
    </TestContextProvider>
  ));

if (__TEST__) {
  describe('Header', () => {
    it('should handle onSearchToggle on back icon', () => {
      const handleSearchToggle = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <Header
            height={67}
            isSearchFocused
            onSearchToggle={handleSearchToggle}
            onSearchInputChange={handleFakePress}
            onLogoLongPress={handleFakePress}
          />
        </TestContextProvider>
      );

      const icon = component.root.find(el => el.props.testID === 'search-back-icon');
      icon.props.onPress();

      expect(handleSearchToggle).toHaveBeenCalledTimes(1);
    });

    it('should handle onSearchToggle on magnifier icon', () => {
      const handleSearchToggle = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <Header
            height={67}
            onSearchToggle={handleSearchToggle}
            onSearchInputChange={handleFakePress}
            onLogoLongPress={handleFakePress}
          />
        </TestContextProvider>
      );

      const icon = component.root.find(el => el.props.testID === 'search-icon');
      icon.props.onPress();

      expect(handleSearchToggle).toHaveBeenCalledTimes(1);
    });

    it('should handle onSearchInputChange', () => {
      const handleSearchInputChange = jest.fn();
      const value = 'foo';
      const component = renderer.create(
        <TestContextProvider>
          <Header
            height={67}
            isSearchFocused
            onSearchToggle={handleFakePress}
            onSearchInputChange={handleSearchInputChange}
            onLogoLongPress={handleFakePress}
          />
        </TestContextProvider>
      );

      const input = component.root.find(el => el.props.testID === 'search-input');
      input.props.onChange(value);

      expect(handleSearchInputChange).toHaveBeenCalledTimes(1);
      expect(handleSearchInputChange).toHaveBeenCalledWith(value);
    });

    it('should handle onLogoLongPress', () => {
      const handleLogoLongPress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <Header
            height={67}
            onSearchToggle={handleFakePress}
            onSearchInputChange={handleFakePress}
            onLogoLongPress={handleLogoLongPress}
          />
        </TestContextProvider>
      );

      const input = component.root.find(el => el.props.testID === 'header-logo');
      input.props.onLongPress();

      expect(handleLogoLongPress).toHaveBeenCalledTimes(1);
    });
  });
}
