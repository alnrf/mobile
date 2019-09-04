// @flow strict

import {createProgression} from '../../__fixtures__/progression';
import {createStoreState} from '../../__fixtures__/store';
import {ENGINE, CONTENT_TYPE} from '../../const';
import {TOGGLE, toggle} from './fast-slide';
import type {Action} from './fast-slide';

const progression = createProgression({
  engine: ENGINE.MICROLEARNING,
  progressionContent: {
    type: CONTENT_TYPE.LEVEL,
    ref: ''
  }
});

describe('FastSlide', () => {
  describe('toggle', () => {
    it('should enable it', async () => {
      const dispatch: Dispatch = jest.fn();
      const getState: GetState = jest.fn(() =>
        createStoreState({
          levels: [],
          disciplines: [],
          chapters: [],
          slides: [],
          progression
        })
      );
      const expected: Action = {
        type: TOGGLE,
        payload: true
      };
      // $FlowFixMe missing callable signature
      await toggle()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });

    it('should disable it', async () => {
      const dispatch: Dispatch = jest.fn();
      const getState: GetState = jest.fn(() =>
        createStoreState({
          levels: [],
          disciplines: [],
          chapters: [],
          slides: [],
          progression,
          fastSlide: true
        })
      );
      const expected: Action = {
        type: TOGGLE,
        payload: false
      };
      // $FlowFixMe missing callable signature
      await toggle()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
