// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import type {StoreState} from '../redux';
import theme from '../modules/theme';
import ProgressionBar from './progression-bar';
import {BrandThemeContext} from './brand-theme-provider';
import Text from './text';

type ConnectedStateProps = {|
  current?: number,
  count?: number
|};

type Props = {|
  ...ConnectedStateProps
|};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  label: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.tiny,
    paddingVertical: theme.spacing.micro,
    backgroundColor: theme.colors.gray.light,
    borderBottomLeftRadius: theme.radius.medium
  },
  current: {
    fontWeight: theme.fontWeight.bold,
    fontSize: 13
  },
  count: {
    color: theme.colors.gray.medium,
    fontWeight: theme.fontWeight.bold,
    fontSize: 13
  }
});

const Progression = ({current, count}: Props) => {
  if (!current || !count) {
    return null;
  }

  return (
    <View testID="progression">
      <ProgressionBar current={current} count={count} />
      <View style={styles.labelContainer}>
        <View style={styles.label} testID="progression-label">
          <BrandThemeContext.Consumer>
            {brandTheme => (
              <Text style={[styles.current, {color: brandTheme.colors.primary}]}>{current}</Text>
            )}
          </BrandThemeContext.Consumer>
          <Text style={styles.count}>/{count}</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({progression}: StoreState): ConnectedStateProps => ({
  current: progression.current,
  count: progression.count
});

export {Progression as Component};
export default connect(mapStateToProps)(Progression);
