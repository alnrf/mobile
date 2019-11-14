// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import theme from '../modules/theme';
import HeaderBackButton from './header-back-button';

export type Props = {|
  children: React.Node,
  headerBackgroundColor?: string,
  iconBackgroundColor?: string,
  renderIcon?: () => React.Node,
  onClose: () => void,
  testID?: string
|};

const HEADER_HEIGHT = 75;

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    backgroundColor: theme.colors.white
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.medium,
    height: HEADER_HEIGHT
  },
  content: {
    padding: theme.spacing.medium,
    alignItems: 'center'
  },
  contentWithIcon: {
    paddingTop: theme.spacing.small
  },
  icon: {
    marginTop: -HEADER_HEIGHT / 2,
    padding: 5,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.thumbnail,
    alignSelf: 'center'
  },
  iconContent: {
    padding: theme.spacing.small,
    borderRadius: theme.radius.thumbnail,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Modal = ({
  children,
  headerBackgroundColor = theme.colors.white,
  iconBackgroundColor = theme.colors.white,
  renderIcon,
  onClose,
  testID
}: Props) => (
  <View style={styles.container} testID={testID}>
    <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
      <HeaderBackButton
        color={theme.colors.gray.dark}
        isFloating={false}
        testID="close-modal"
        onPress={onClose}
        type="close"
      />
    </View>
    {renderIcon && (
      <View style={styles.icon}>
        <View style={[styles.iconContent, {backgroundColor: iconBackgroundColor}]}>
          {renderIcon()}
        </View>
      </View>
    )}
    <View style={[styles.content, renderIcon && styles.contentWithIcon]}>{children}</View>
  </View>
);

export default Modal;
