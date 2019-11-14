// @flow strict

import {FOCUS, BLUR} from '../../actions/ui/select';
import type {Action} from '../../actions/ui/select';

export type State = string | void;

export const initialState: State = undefined;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FOCUS: {
      return action.payload;
    }
    case BLUR: {
      return undefined;
    }
    default:
      return state;
  }
};

export default reducer;
