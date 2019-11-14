// @flow strict

import {FOCUS, BLUR} from '../../actions/ui/select';
import type {Action} from '../../actions/ui/select';
import reducer from './select';
import type {State} from './select';

describe('Select', () => {
  const expectedInitialState: State = undefined;

  it('Default', () => {
    const action = {
      type: 'foo'
    };
    // $FlowFixMe we are trying to emulate something else
    const result = reducer(undefined, action);
    expect(result).toEqual(expectedInitialState);
  });

  describe(FOCUS, () => {
    it('Default', () => {
      const action: Action = {
        type: FOCUS,
        payload: 'foo'
      };
      const result = reducer(expectedInitialState, action);
      const expected = 'foo';

      expect(result).toEqual(expected);
    });
  });

  describe(BLUR, () => {
    it('Default', () => {
      const action: Action = {
        type: BLUR
      };
      const result = reducer('foo', action);
      expect(result).toEqual(undefined);
    });
  });
});
