// @flow

import {createChapterCard} from '../__fixtures__/cards';
import {createCatalogState, createStoreState} from '../__fixtures__/store';
import {createProgression} from '../__fixtures__/progression';
import {CARD_STATUS} from '../layer/data/_const';
import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import {ENGINE, CONTENT_TYPE} from '../const';
import {mapStateToProps} from './catalog-search';
import type {ConnectedStateProps} from './catalog-search';

jest.useFakeTimers();

const cardsRef = ['foo', 'bar', 'baz', 'qux', 'quux', undefined];
const cards: Array<DisciplineCard | ChapterCard | void> = cardsRef.map(
  ref =>
    ref &&
    createChapterCard({
      ref,
      completion: 0,
      title: 'Fake chapter',
      status: CARD_STATUS.ACTIVE
    })
);

describe('CatalogSearch', () => {
  describe('mapStateToProps', () => {
    const catalog = createCatalogState({cards});

    it('should get all props', () => {
      const levelRef = 'dummyRef';
      const progression = createProgression({
        engine: ENGINE.MICROLEARNING,
        progressionContent: {
          type: CONTENT_TYPE.LEVEL,
          ref: levelRef
        }
      });

      const mockedStore = createStoreState({
        levels: [],
        disciplines: [],
        chapters: [],
        slides: [],
        progression,
        catalog
      });

      const result = mapStateToProps(mockedStore);
      const expected: ConnectedStateProps = {
        cards
      };

      expect(result).toEqual(expected);
    });
  });
});
