// @flow

import {ERROR_TYPE} from '../../../const';
import {focus, blur, FOCUS, BLUR} from './select';
import type {Action} from './select';

describe('select', () => {
  describe('focus', () => {
    it('should return an action without the select.key focused', () => {
      const result = focus('foo');
      const expected: Action<void> = {
        type: FOCUS,
        payload: 'foo'
      };

      expect(result).toEqual(expected);
    });
  });

  describe('blur', () => {
    it('should return the action', () => {
      const action = blur();
      expect(action).toEqual({
        type: BLUR
      });
    });
  });
});
