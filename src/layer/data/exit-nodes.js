// @flow strict
import type {ExitNodeAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {mapToExitNodeAPI} from './mappers';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {ExitNode} from './_types';

export const getExitNode = async (exitNodeRef: string): Promise<ExitNodeAPI> => {
  console.log('getExitNode', exitNodeRef);
  const language = translations.getLanguage();
  // $FlowFixMe union type
  const item: ExitNode = await getItem(CONTENT_TYPE.EXIT_NODE, language, exitNodeRef);
  return mapToExitNodeAPI(item);
};

export default getExitNode;
