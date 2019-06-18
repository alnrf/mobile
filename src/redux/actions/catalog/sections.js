// @flow strict

import type {Section} from '../../../types';
import type {SupportedLanguage} from '../../../translations/_types';
import type {StoreAction, ErrorAction} from '../../_types';
import {getToken} from '../../utils/state-extract';
import {ERROR_TYPE} from '../../../const';
import {showModal} from '../ui/modal';
import type {Action as ModalAction} from '../ui/modal';
import {fetchCards} from './cards';

export const FETCH_REQUEST = '@@sections/FETCH_REQUEST';
export const FETCH_SUCCESS = '@@sections/FETCH_SUCCESS';
export const FETCH_ERROR = '@@sections/FETCH_ERROR';

export const DEFAULT_LIMIT = 3;

export type Action =
  | {|
      type: '@@sections/FETCH_REQUEST',
      payload: {
        language: SupportedLanguage
      }
    |}
  | {|
      type: '@@sections/FETCH_SUCCESS',
      payload: {
        items: Array<Section>,
        language: SupportedLanguage
      }
    |}
  | ErrorAction<{|
      type: '@@sections/FETCH_ERROR'
    |}>;

export const fetchRequest = (language: SupportedLanguage): Action => ({
  type: FETCH_REQUEST,
  payload: {
    language
  }
});

export const fetchSuccess = (items: Array<Section>, language: SupportedLanguage): Action => ({
  type: FETCH_SUCCESS,
  payload: {
    items,
    language
  }
});

export const fetchError = (error: Error): Action => ({
  type: FETCH_ERROR,
  payload: error,
  error: true
});

export const fetchSections = (
  language: SupportedLanguage
): StoreAction<Action | ModalAction<StoreAction<Action>>> => async (
  dispatch,
  getState,
  options
) => {
  const {services} = options;

  try {
    await dispatch(fetchRequest(language));
    const token = getToken(getState());

    if (!token) {
      throw new Error('Token not defined');
    }

    const sections = await services.Sections.find(token);
    const result = await dispatch(fetchSuccess(sections, language));

    await Promise.all(
      sections.map(section =>
        // $FlowFixMe callable signature
        fetchCards(section.key, 0, DEFAULT_LIMIT, language)(dispatch, getState, options)
      )
    );

    return result;
  } catch (e) {
    dispatch(fetchError(e));
    return dispatch(
      showModal({
        errorType: ERROR_TYPE.NO_CONTENT_FOUND,
        lastAction: () => fetchSections(language)
      })
    );
  }
};
