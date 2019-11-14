// @flow strict

import type {StoreAction} from '../../_types';

export const FOCUS = '@@select/FOCUS';
export const BLUR = '@@select/BLUR';

export type Action =
  | {|
      type: '@@select/FOCUS',
      payload: {key: string}
    |}
  | {|
      type: '@@select/BLUR'
    |};

export const focus = ({key}: {key: string}): Action => ({
  type: FOCUS,
  payload: {key}
});

export const blur = (): Action => ({
  type: BLUR
});
