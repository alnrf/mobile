// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';
import {storiesOf} from '@storybook/react-native';

import {__TEST__} from '../modules/environment';
import {handleFakePress} from '../utils/tests';
import SearchInput from './search-input';

storiesOf('SearchInput', module)
  .add('Default', () => <SearchInput onClear={handleFakePress} onChange={handleFakePress} />)
  .add('With text', () => (
    <SearchInput value="Foo" onClear={handleFakePress} onChange={handleFakePress} />
  ))
  .add('Fetching', () => (
    <SearchInput value="Foo" isFetching onClear={handleFakePress} onChange={handleFakePress} />
  ));

if (__TEST__) {
  describe('Button', () => {
    it('should handle onClear', () => {
      const handleClear = jest.fn();
      const component = renderer.create(
        <SearchInput value="foo" onClear={handleClear} onChange={handleFakePress} />
      );
      const icon = component.root.find(el => el.props.testID === 'search-input-clear');
      icon.props.onPress();
      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('should handle onChange', () => {
      const handleChange = jest.fn();
      const value = 'foo';
      const component = renderer.create(
        <SearchInput onClear={handleFakePress} onChange={handleChange} />
      );
      const input = component.root.find(el => el.props.testID === 'search-input-field');
      input.props.onChangeText(value);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(value);
    });
  });
}
