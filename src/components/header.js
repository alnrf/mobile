// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NovaCompositionCoorpacademySearch as SearchIcon} from '@coorpacademy/nova-icons';

import theme, {getHitSlop} from '../modules/theme';
import {BrandThemeContext} from './brand-theme-provider';
import HeaderBackButton, {BACK_ICON_HEIGHT, SPACING as ICON_SPACING} from './header-back-button';
import ImageBackground from './image-background';
import SearchInput from './search-input';
import Touchable from './touchable';

type Props = {|
  height: number,
  searchValue?: string,
  isSearchFocused?: boolean,
  isSearchFetching?: boolean,
  onSearchToggle: () => void,
  onSearchInputChange: () => void,
  onLogoLongPress: () => void
|};

const CENTER_PADDING = theme.spacing.small;
const SIDE_WIDTH = BACK_ICON_HEIGHT + ICON_SPACING;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  side: {
    width: SIDE_WIDTH,
    justifyContent: 'center'
  },
  right: {
    alignItems: 'flex-end',
    paddingRight: theme.spacing.medium
  },
  center: {
    flex: 1,
    padding: CENTER_PADDING
  },
  logo: {
    width: '100%'
  }
});

const Header = ({
  onLogoLongPress,
  isSearchFocused,
  onSearchToggle,
  height,
  searchValue,
  isSearchFetching,
  onSearchInputChange
}: Props) => {
  const brandTheme = React.useContext(BrandThemeContext);
  const logoHeight = height - CENTER_PADDING * 2;

  return (
    <View style={[styles.container, {height}]}>
      <View style={styles.side}>
        {isSearchFocused ? (
          <HeaderBackButton
            color={theme.colors.gray.dark}
            testID="search-back-icon"
            onPress={onSearchToggle}
            type="back"
          />
        ) : null}
      </View>
      <View style={styles.center}>
        {isSearchFocused ? (
          <SearchInput
            value={searchValue}
            isFetching={isSearchFetching}
            onChange={onSearchInputChange}
            testID="search-input"
          />
        ) : (
          <Touchable
            testID="header-logo"
            onLongPress={onLogoLongPress}
            analyticsID="sign-out"
            isWithoutFeedback
          >
            <ImageBackground
              style={[styles.logo, {height: logoHeight}]}
              testID="brand-logo"
              source={{
                uri: brandTheme.images['logo-mobile']
              }}
              resizeMode="contain"
            />
          </Touchable>
        )}
      </View>
      {!isSearchFocused ? (
        <View style={[styles.side, styles.right]}>
          <Touchable
            testID="search-icon"
            hitSlop={getHitSlop()}
            onPress={onSearchToggle}
            analyticsID="search-icon"
          >
            <SearchIcon height={20} width={20} color={theme.colors.gray.dark} />
          </Touchable>
        </View>
      ) : null}
    </View>
  );
};

export default Header;
