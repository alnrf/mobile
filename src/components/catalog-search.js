// @flow strict

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import theme from '../modules/theme';
import translations from '../translations';
import withLayout from '../containers/with-layout';
import type {WithLayoutProps} from '../containers/with-layout';
import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import CatalogItems, {ITEM_WIDTH} from './catalog-items';
import Space from './space';
import Text from './text';

const LIST_HORIZONTAL_OFFSET = theme.spacing.micro;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.white
  },
  content: {
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: LIST_HORIZONTAL_OFFSET
  },
  noResults: {
    fontSize: theme.fontSize.xxlarge,
    fontWeight: theme.fontWeight.bold
  },
  noResultsDescription: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.gray.dark,
    textAlign: 'center'
  }
});

type Props = {|
  ...WithLayoutProps,
  cards?: Array<DisciplineCard | ChapterCard | void>,
  onCardPress: (DisciplineCard | ChapterCard) => void,
  onScroll?: ScrollEvent => void,
  testID?: string
|};

const CatalogSearch = ({
  layout,
  cards,
  onCardPress,
  onScroll,
  testID = 'catalog-search'
}: Props) => {
  const numColumns = layout
    ? parseInt((layout.width - LIST_HORIZONTAL_OFFSET) / ITEM_WIDTH, 10)
    : undefined;

  return (
    <View style={styles.container}>
      {cards && cards.length === 0 ? (
        <View style={styles.content}>
          <Space type="xlarge" />
          <Text style={styles.noResults}>{translations.noResults}</Text>
          <Space />
          <Text style={styles.noResultsDescription}>{translations.noResultsDescription}</Text>
        </View>
      ) : null}
      {cards && cards.length > 0 ? (
        <CatalogItems
          cards={cards}
          onCardPress={onCardPress}
          onScroll={onScroll}
          numColumns={numColumns}
          style={styles.content}
          testID={`${testID}-items`}
        />
      ) : null}
    </View>
  );
};

export {CatalogSearch as Component};
export default withLayout(CatalogSearch);
