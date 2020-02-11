// @flow strict

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import type {DisciplineCard, ChapterCard} from '../layer/data/_types';

const styles = StyleSheet.create({
});

type Props = {|
  cards?: Array<DisciplineCard | ChapterCard | void>,
  onCardPress: (DisciplineCard | ChapterCard) => void
|};

const CatalogSearch = ({cards, onCardPress}: Props) => <View />;

export default CatalogSearch;
