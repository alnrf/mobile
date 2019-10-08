// @flow

import Promise from 'bluebird';
import noop from 'lodash/fp/noop';
import {createChapterCard} from '../../__fixtures__/cards';
import {createHeroRecommendation} from '../../__fixtures__/hero-recommendation';
import type {ChapterCard, HeroRecommendation} from './_types';
import {getHero} from './hero';

describe('HeroContent', () => {
  describe('Recommendation', () => {
    it('should fetchRecommendations when no progression is provided', async () => {
      const fetchRecommendations = jest.fn();
      expect(await getHero([], fetchRecommendations, noop)).toEqual(undefined);
      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
    });

    it('should return "recommendation" when all started progressions are successful', async () => {
      const reco: ChapterCard = createChapterCard({
        ref: 'reco',
        status: 'isStarted',
        title: 'plop',
        completion: 12
      });

      const fetchRecommendations = jest.fn(() => Promise.resolve(reco));
      const hero = await getHero(
        [
          createHeroRecommendation({
            progressionId: 'foo_p',
            contentRef: 'foo',
            success: true
          }),
          createHeroRecommendation({
            progressionId: 'bar_p',
            contentRef: 'bar',
            success: true
          })
        ],
        fetchRecommendations,
        noop
      );

      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
      expect(hero).toEqual(reco);
    });

    it('should return "recommendation" if no started content have at least 3 questions answered', async () => {
      const completions: Array<HeroRecommendation> = [
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because  success: true',
          success: true
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because  nbSlides < 3',
          nbSlides: 2,
          success: false
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because | date 2018',
          updatedAt: '2018-05-23T16:10:38.486Z',
          nbSlides: 1,
          success: false
        })
      ];
      const reco: ChapterCard = createChapterCard({
        ref: 'reco',
        status: 'isStarted',
        title: 'plop',
        completion: 12
      });

      const fetchRecommendations = jest.fn(() => Promise.resolve(reco));
      const fetchCard = jest.fn();

      const hero = await getHero(completions, fetchRecommendations, fetchCard);

      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
      expect(fetchCard).toHaveBeenCalledTimes(0);
      expect(hero).toEqual(reco);
    });
  });

  describe('Recent content', () => {
    it('should return "the most recent content", not finished, having 3 or more questions answered', async () => {
      const completions: Array<HeroRecommendation> = [
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because success: true',
          success: true
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because nbSlides < 3',
          nbSlides: 2,
          success: false
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because date 2018',
          updatedAt: '2018-05-23T16:10:38.486Z',
          nbSlides: 12,
          success: false
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should be selected',
          updatedAt: '2019-05-23T16:10:38.486Z',
          nbSlides: 10,
          success: false
        }),
        createHeroRecommendation({
          progressionId: 'foo',
          contentRef: 'should not be selected because date 2017',
          updatedAt: '2017-05-23T16:10:38.486Z',
          nbSlides: 8,
          success: false
        })
      ];

      const fetchRecommendation = jest.fn();
      const fetchCard = jest.fn();

      await getHero(completions, fetchRecommendation, fetchCard);
      expect(fetchRecommendation).toHaveBeenCalledTimes(0);
      expect(fetchCard).toHaveBeenCalledTimes(1);
      expect(fetchCard).toHaveBeenCalledWith({
        ref: 'should be selected',
        type: 'chapter',
        version: '1'
      });
    });
  });
});
