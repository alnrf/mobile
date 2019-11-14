// @flow strict

import {FOCUS, BLUR} from '../../actions/ui/select';
import type {Action} from '../../actions/ui/select';

export type State = {|key: string | null|};

export const initialState: State = {key: null};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FOCUS: {
      return {
        key: action.payload.key
      };
    }
    case BLUR: {
      return {key: null};
    }
    default:
      return state;
  }
};

export default reducer;
