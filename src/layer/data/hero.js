// @flow

import type {Content} from '@coorpacademy/progression-engine';
import type {DisciplineCard, ChapterCard, HeroRecommendation} from './_types';

const isStepGreaterThan3 = (aggregation: HeroRecommendation): boolean => aggregation.nbSlides > 3;

const isNotFinished = (aggregation: HeroRecommendation): boolean => aggregation.success === false;

const isOnGoing = (aggregation: HeroRecommendation): boolean =>
  isStepGreaterThan3(aggregation) && isNotFinished(aggregation);

export const getHero = (
  aggregations: Array<HeroRecommendation>,
  fetchRecommendation: () => Promise<DisciplineCard | ChapterCard | void>,
  fetchCard: Content => Promise<DisciplineCard | ChapterCard | void>
): Promise<DisciplineCard | ChapterCard | void> => {
  const ongoingAggregations = aggregations.filter(isOnGoing);
  ongoingAggregations.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  const selectedAggregation = ongoingAggregations[0];

  if (selectedAggregation) {
    return fetchCard(selectedAggregation.content);
  }

  return fetchRecommendation();
};
