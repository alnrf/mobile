// @flow

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  NovaSolidVoteRewardsVoteHeart as HeartIcon,
  NovaCompositionCoorpacademyBrokenHeart as HeartBrokenIcon,
  NovaCompositionCoorpacademyVoteHeartOutline as HeartOutlineIcon
} from '@coorpacademy/nova-icons';

import theme from '../modules/theme';

export type Props = {|
  count: number,
  height: number,
  isBroken?: boolean,
  testID?: string
|};

const HEART_OFFSET_RIGHT = 0.4;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  heart: {
    position: 'absolute'
  },
  lives: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.thumbnail,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heartIcon: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray.dark
  }
});

const Lives = ({count, height, isBroken, testID = 'lives'}: Props) => {
  const heartHeight = height * 0.6;
  const heartIconStyle = {height: heartHeight, width: heartHeight};
  const containerStyle = {
    paddingLeft: heartHeight * (1 - HEART_OFFSET_RIGHT),
    width: height + heartHeight * (1 - HEART_OFFSET_RIGHT),
    height
  };
  const livesStyle = {
    width: height,
    height
  };
  const textStyle = {
    fontSize: height / 3
  };

  const brokenSuffix = isBroken ? '-broken' : '';

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.lives, livesStyle]} testID={`${testID}-${count}${brokenSuffix}`}>
        <Text style={[styles.text, textStyle]}>x{count}</Text>
      </View>
      <View style={[styles.heart, {height: heartHeight, width: heartHeight}]}>
        <HeartOutlineIcon
          color={theme.colors.white}
          stroke={theme.colors.white}
          style={{height: heartHeight, width: heartHeight}}
        />
        {!isBroken && (
          <HeartIcon color={theme.colors.negative} style={[styles.heartIcon, heartIconStyle]} />
        )}
        {isBroken && (
          <HeartBrokenIcon
            color={theme.colors.negative}
            style={[styles.heartIcon, heartIconStyle]}
          />
        )}
      </View>
    </View>
  );
};

export default Lives;
