// @flow

import * as React from 'react';
import DeckSwiper from '@coorpacademy/react-native-deck-swiper';

import theme from '../modules/theme';
import type {CardType, Resource} from '../types';

export type Card = {|
  isCorrect: boolean,
  title: string,
  type: CardType,
  resource?: Resource,
  offeringExtraLife?: boolean
|};

export type Props = {|
  testID: string,
  items: Array<Card>,
  renderItem: (Card, number) => React.Node,
  cardStyle?: ViewStyleProp,
  onSwiped: (cardIndexSwiped: number) => void,
  onSwipedAll: () => void,
  cardIndexShown?: number
|};

class Cards extends React.PureComponent<Props> {
  props: Props;

  swiper: DeckSwiper;

  forceUpdate = () => {
    this.swiper && this.swiper.forceUpdate();
  };

  handleRef = (element: DeckSwiper | null) => {
    this.swiper = element;
  };

  render() {
    const {
      items,
      renderItem,
      cardStyle,
      onSwiped,
      onSwipedAll,
      cardIndexShown = 0,
      testID
    } = this.props;

    return (
      <DeckSwiper
        testID={testID}
        cards={items}
        onSwiped={onSwiped}
        onSwipedAll={onSwipedAll}
        cardIndex={cardIndexShown}
        renderCard={renderItem}
        stackSize={items.length}
        infinite
        animateCardOpacity
        cardVerticalMargin={0}
        stackSeparation={15}
        stackScale={5}
        backgroundColor="transparent"
        cardHorizontalMargin={theme.spacing.base}
        cardStyle={cardStyle}
        ref={this.handleRef}
      />
    );
  }
}

export default Cards;
