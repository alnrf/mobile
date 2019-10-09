// @flow strict

import decode from 'jwt-decode';

import fetch from '../../modules/fetch';
import {get as getToken} from '../../utils/local-token';
import type {JWT} from '../../types';
import translations from '../../translations';
import type {DisciplineCard, ChapterCard} from './_types';

// @todo replace fetchRecommendation() by find(type: string, ref: string)
const fetchRecommendation = async (): Promise<DisciplineCard | ChapterCard | void> => {
  const language = translations.getLanguage();
  const token = await getToken();

  if (!token) {
    throw new Error('Invalid token');
  }

  const jwt: JWT = decode(token);
  const response = await fetch(
    `${jwt.host}/api/v2/recommendations?contentType=all&withoutAdaptive=true&lang=${language}`,
    {
      headers: {
        authorization: token
      }
    }
  );

  const {hits}: {hits: Array<DisciplineCard | ChapterCard>} = await response.json();
  return hits[0];
};

export {fetchRecommendation};
