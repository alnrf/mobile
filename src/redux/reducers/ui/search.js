// @flow strict

import {TOGGLE, EDIT} from '../../actions/ui/search';
import type {Action} from '../../actions/ui/search';

export type State = {|
  isVisible: boolean,
  value?: string
|};

export const initialState: State = {
  isVisible: false
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case TOGGLE: {
      return {
        ...state,
        isVisible: action.payload
      };
    }
    case EDIT: {
      return {
        ...state,
        value: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
