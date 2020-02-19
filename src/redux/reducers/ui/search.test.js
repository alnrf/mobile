// @flow strict

import {TOGGLE, EDIT} from '../../actions/ui/search';
import type {Action} from '../../actions/ui/search';
import reducer from './search';
import type {State} from './search';

describe('Select', () => {
  const expectedInitialState: State = {
    isVisible: false
  };

  it('Default', () => {
    const action = {
      type: 'foo'
    };
    // $FlowFixMe we are trying to emulate something else
    const result = reducer(undefined, action);
    expect(result).toEqual(expectedInitialState);
  });

  describe(TOGGLE, () => {
    it('Default', () => {
      const payload = true;
      const action: Action = {
        type: TOGGLE,
        payload
      };
      const result = reducer(expectedInitialState, action);
      const expected: State = {
        isVisible: true
      };

      expect(result).toEqual(expected);
    });
  });

  describe(EDIT, () => {
    it('Default', () => {
      const payload = 'foo';
      const action: Action = {
        type: EDIT,
        payload
      };
      const result = reducer(expectedInitialState, action);
      const expected: State = {
        isVisible: false,
        value: payload
      };

      expect(result).toEqual(expected);
    });
  });
});
