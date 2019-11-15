// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';

import {handleFakePress} from '../utils/tests';
import Select from './select';

describe('Select', () => {
  it('should handle focus', () => {
    const focus = jest.fn();
    const id = 'foo';

    const component = renderer.create(<Select focus={focus} blur={handleFakePress} id={id} />);

    const modal = component.root.find(el => el.props.testID === 'select');
    modal.props.onFocus();

    expect(focus).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledWith({key: id});
  });

  it('should handle blur', () => {
    const blur = jest.fn();
    const id = 'foo';

    const component = renderer.create(<Select focus={handleFakePress} blur={blur} id={id} />);

    const modal = component.root.find(el => el.props.testID === 'select');
    modal.props.onBlur();

    expect(blur).toHaveBeenCalledTimes(1);
  });
});
