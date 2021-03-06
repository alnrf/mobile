// @flow strict

import translations from '../../translations';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {Slide} from './_types';

export const getCorrectAnswer = async (slideId: string): Promise<Array<Array<string>>> => {
  const language = await translations.getLanguage();
  // $FlowFixMe union type
  const slide: Slide = await getItem(CONTENT_TYPE.SLIDE, language, slideId);
  return slide.question.content.answers;
};

export default getCorrectAnswer;
