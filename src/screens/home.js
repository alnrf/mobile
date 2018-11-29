// @flow strict

import * as React from 'react';

import Home from '../components/home';
import Screen from '../components/screen';

type Props = ReactNavigation$ScreenProps;

class HomeScreen extends React.PureComponent<Props, void> {
  props: Props;

  static navigationOptions = ({navigationOptions}: ReactNavigation$ScreenProps) => ({
    ...navigationOptions,
    headerStyle: {
      ...navigationOptions.headerStyle,
      shadowColor: 'transparent',
      elevation: 0,
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      height: 0,
    },
  });

  render() {
    return (
      <Screen>
        <Home />
      </Screen>
    );
  }
}

export default HomeScreen;
