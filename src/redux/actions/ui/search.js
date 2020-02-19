// @flow strict

export const TOGGLE = '@@search/TOGGLE';
export const EDIT = '@@search/EDIT';

export type Action =
  | {|
      type: '@@search/TOGGLE',
      payload: boolean
    |}
  | {|
      type: '@@search/EDIT',
      payload: string
    |};

export const toggle = (payload: boolean): Action => ({
  type: TOGGLE,
  payload
});

export const edit = (payload: string): Action => ({
  type: EDIT,
  payload
});
