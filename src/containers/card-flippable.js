// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import CardFlip from 'react-native-card-flip';
import theme from '../modules/theme';
import {BrandThemeContext} from '../components/brand-theme-provider';
import withDarkMode from './with-dark-mode';
import type {WithDarkModeProps} from './with-dark-mode';

const HEIGHT = 270;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.base
  },
  cardFlip: {
    width: '100%',
    height: HEIGHT,
    flex: 1
  },
  cards: {
    flex: 1,
    width: '100%',
    height: HEIGHT,
    padding: theme.spacing.small,
    borderRadius: theme.radius.card
  },
  frontItem: {
    flex: 1,
    backgroundColor: theme.colors.gray.dark
  },
  fronItemDarkMode: {
    backgroundColor: '#202020'
  },
  backItem: {
    justifyContent: 'center'
  }
});

type State = {|
  isFlipped: boolean
|};

type Props = {|
  ...WithDarkModeProps,
  flipDirection?: string,
  perspective?: number,
  duration?: number,
  slideId: string,
  starsDiff: number,
  frontItem: (flipCard: CardFlip) => React$Node,
  children: React$Node,
  onPress: () => void
|};

class FlippableCard extends React.Component<Props, State> {
  props: Props;

  ref: CardFlip;

  state: State = {
    isFlipped: false
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.ref && this.props.slideId !== prevProps.slideId && this.state.isFlipped) {
      this.ref.flip();
      this.handleFlipped();
    }
  }

  handleFlipped = () => this.setState({isFlipped: false});

  handleFlipCard = () => {
    const {onPress} = this.props;

    if (this.ref) {
      this.ref.flip();
      onPress();
      this.setState({isFlipped: true});
    }
  };

  handleRef = (card: CardFlip) => (this.ref = card);

  render() {
    const {
      flipDirection = 'x',
      perspective = 800,
      duration = 1000,
      starsDiff,
      frontItem,
      isDarkModeActivated,
      children: backItem
    } = this.props;
    return (
      <BrandThemeContext.Consumer>
        {brandTheme => (
          <View style={styles.container} testID="card-flippable">
            <CardFlip
              style={styles.cardFlip}
              ref={this.handleRef}
              flipDirection={flipDirection}
              perspective={perspective}
              duration={duration}
            >
              <View
                style={[
                  styles.cards,
                  styles.frontItem,
                  isDarkModeActivated && styles.fronItemDarkMode
                ]}
                testID="clue-front"
              >
                {frontItem({onPress: this.handleFlipCard, starsDiff})}
              </View>
              <View
                style={[
                  styles.cards,
                  styles.backItem,
                  {backgroundColor: brandTheme.colors.primary}
                ]}
                testID="clue-back"
              >
                {backItem}
              </View>
            </CardFlip>
          </View>
        )}
      </BrandThemeContext.Consumer>
    );
  }
}

export default withDarkMode(FlippableCard);
