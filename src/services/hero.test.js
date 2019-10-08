// @flow strict

import {createChapterCard} from '../__fixtures__/cards';
import type {DataLayer} from '../layer/data';

describe('Hero service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get card', async () => {
    const createService = require('./hero').default;

    jest.mock('../layer/data/progressions', () => {
      return {
        getAggregationsByContent: jest.fn(() => Promise.resolve(['a', 'b', 'c']))
      };
    });

    const card = createChapterCard({
      ref: 'foo',
      status: 'isStarted',
      title: 'plop',
      completion: 12
    });

    const fetchCard = jest.fn();
    const fetchRecommendation = jest.fn();

    const getHero = jest.fn();
    getHero.mockImplementationOnce(
      ((_aggregations, _fetchRecommendation, _fetchCard) => {
        expect(_aggregations).toEqual(['a', 'b', 'c']);
        expect(_fetchRecommendation).toEqual(fetchRecommendation);
        expect(_fetchCard).toEqual(_fetchCard);
        return Promise.resolve(card);
      }: $PropertyType<DataLayer, 'getHero'>)
    );

    // $FlowFixMe datalayer doesn't need to be filled with mocks for this test
    const heroService = createService({fetchCard, fetchRecommendation, getHero});
    const result = await heroService.get();
    expect(result).toEqual(card);
    expect(getHero).toHaveBeenCalledTimes(1);
  });

  it('should return undefined if no aggregation and no reco is found', async () => {
    const createService = require('./hero').default;

    jest.mock('../layer/data/progressions', () => {
      return {
        getAggregationsByContent: jest.fn(() => Promise.resolve([]))
      };
    });

    const fetchCard = jest.fn();
    const fetchRecommendation = jest.fn();
    const getHero = jest.fn();

    // $FlowFixMe datalayer doesn't need to be filled with mocks for this test
    const heroService = createService({fetchCard, fetchRecommendation, getHero});
    const result = await heroService.get();
    expect(result).toEqual(undefined);
    expect(getHero).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
