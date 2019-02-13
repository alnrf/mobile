// @flow

import * as React from 'react';
import {View, Animated} from 'react-native';

import theme from '../modules/theme';
import {BrandThemeContext} from './brand-theme-provider';

type Props = {|
  current: number,
  count: number,
  isInnerRounded?: boolean,
  height?: number,
  bgBarColor?: string,
  topBarColor?: string
|};

const BAR_HEIGHT = 3;

class ProgressionBar extends React.PureComponent<Props> {
  props: Props;

  percentage: Animated.Value = new Animated.Value(this.props.current / this.props.count);

  render() {
    const {current, count, height, isInnerRounded, bgBarColor, topBarColor} = this.props;
    const barHeight = height ? height : BAR_HEIGHT;
    const barRadius = isInnerRounded ? barHeight / 2 : 0;
    const barStyle = {
      height: barHeight,
      borderBottomRightRadius: barRadius,
      borderTopRightRadius: barRadius
    };

    const barContainer = {
      backgroundColor: bgBarColor ? bgBarColor : theme.colors.gray.light
    };

    Animated.timing(this.percentage, {
      toValue: current / count
    }).start();

    const width = this.percentage.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%']
    });

    return (
      <BrandThemeContext.Consumer>
        {brandTheme => (
          <View style={barContainer}>
            <Animated.View
              style={[
                barStyle,
                {backgroundColor: topBarColor ? topBarColor : brandTheme.colors.primary, width}
              ]}
              testID={`progression-bar-${current}`}
            />
          </View>
        )}
      </BrandThemeContext.Consumer>
    );
  }
}

export default ProgressionBar;
