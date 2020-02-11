// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';
import {storiesOf} from '@storybook/react-native';

import {handleFakePress} from '../utils/tests';
import {
  createCardLevel,
  createDisciplineCard,
  createChapterCard,
  createCardAuthor
} from '../__fixtures__/cards';
import {__TEST__} from '../modules/environment';
import {AUTHOR_TYPE} from '../const';
import {CARD_STATUS} from '../layer/data/_const';
import CatalogSearch from './catalog-search';

const authorCard = createCardAuthor({authorType: AUTHOR_TYPE.CUSTOM});
const levelCard = createCardLevel({ref: 'mod_1', status: CARD_STATUS.ACTIVE, label: 'Fake level'});
const disciplineCard = createDisciplineCard({
  ref: 'foo',
  completion: 0.3,
  levels: [levelCard],
  title: 'Discipline card'
});
const chapterCard = createChapterCard({
  ref: 'bar',
  completion: 0.8,
  title: 'Chapter card',
  status: CARD_STATUS.ACTIVE,
  isNew: true,
  authors: [authorCard]
});
const cards = new Array(30).fill();

storiesOf('CatalogSearch', module)
  .add('Default', () => <CatalogSearch onCardPress={handleFakePress} />)
  .add('With cards', () => (
    <CatalogSearch
      cards={[disciplineCard, chapterCard].concat(cards.slice(0, 28))}
      onCardPress={handleFakePress}
    />
  ));

if (__TEST__) {
  describe('CatalogSearch', () => {
    it('should handle card press', () => {
      const handleCardPress = jest.fn();
      const component = renderer.create(
        <CatalogSearch
          cards={[disciplineCard, chapterCard].concat(cards.slice(0, 28))}
          onCardPress={handleCardPress}
        />
      );

      const catalogItem = component.root.find(el => el.props.testID === 'catalog-search-item-bar');
      catalogItem.props.onPress();

      expect(handleCardPress).toHaveBeenCalledTimes(1);
      expect(handleCardPress).toHaveBeenCalledWith(chapterCard);
    });
  });
}
