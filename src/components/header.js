// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NovaCompositionCoorpacademySearch as SearchIcon} from '@coorpacademy/nova-icons';
import theme from '../modules/theme';
import HeaderBackButton from './header-back-button';
import {BrandThemeContext} from './brand-theme-provider';
import Touchable from './touchable';
import ImageBackground from './image-background';
import SearchInput from './search-input';

type Props = {|
  onLogoLongPress: () => void,
  isSearchFocused: boolean,
  onSearchToggle: () => void,
  height: number,
  searchValue: string,
  isFetching: boolean,
  onSearchInputChange: () => void,
  onSearchInputClear: () => void
|};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.white
  },
  brandLogoWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  backIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: theme.spacing.small
  },
  searchInput: {
    flex: 1
  },
  logo: {
    width: '100%'
  },
  searchIconWrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    paddingRight: theme.spacing.base
  },
  searchIcon: {
    width: 20,
    height: 20,
    paddingRight: theme.spacing.base
  }
});

const Header = ({
  onLogoLongPress,
  isSearchFocused,
  onSearchToggle,
  height,
  searchValue,
  isFetching,
  onSearchInputChange,
  onSearchInputClear
}: Props) => {
  const HEADER_HEIGHT = height + theme.spacing.small * 2;
  const brandTheme = React.useContext(BrandThemeContext);
  return (
    <View style={[styles.container, {height: HEADER_HEIGHT}]}>
      {isSearchFocused ? (
        <View style={styles.searchContainer}>
          <View style={styles.backIconWrapper}>
            <HeaderBackButton
              color={theme.colors.gray.dark}
              isFloating={false}
              noLeftPadding
              testID="search-back-icon"
              onPress={onSearchToggle}
              type="back"
            />
          </View>
          <View style={styles.searchInput}>
            <SearchInput
              value={searchValue}
              isFetching={isFetching}
              onChange={onSearchInputChange}
              onClear={onSearchInputClear}
            />
          </View>
        </View>
      ) : (
        <View style={styles.brandLogoWrapper}>
          <Touchable
            testID="home-logo"
            onLongPress={onLogoLongPress}
            analyticsID="sign-out"
            isWithoutFeedback
          >
            <ImageBackground
              style={[styles.logo, {height}]}
              testID="brand-logo"
              source={{
                uri: brandTheme.images['logo-mobile']
              }}
              resizeMode="contain"
            />
          </Touchable>
          <View style={styles.searchIconWrapper}>
            <Touchable testID="search-icon" onLongPress={onSearchToggle} analyticsID="search-icon">
              <SearchIcon style={styles.searchIcon} color={theme.colors.gray.dark} />
            </Touchable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
