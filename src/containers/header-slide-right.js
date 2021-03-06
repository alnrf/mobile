// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {getCurrentProgression, getLives} from '@coorpacademy/player-store';

import HeaderSlideRightComponent from '../components/header-slide-right';
import type {StoreState} from '../redux/store';
import {
  isGodModeUser as _isGodModeUser,
  isGodModeEnabled as _isGodModeEnabled,
  isFastSlideEnabled as _isFastSlideEnabled
} from '../redux/utils/state-extract';
import {toggle as toggleGodMode} from '../redux/actions/god-mode';
import {toggle as toggleFastSlide} from '../redux/actions/fast-slide';

type ConnectedStateProps = {|
  count?: number,
  isGodModeUser?: boolean,
  isGodModeEnabled?: boolean,
  isFastSlideEnabled?: boolean
|};

type ConnectedDispatchProps = {|
  toggleGodMode: typeof toggleGodMode,
  toggleFastSlide: typeof toggleFastSlide
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps
|};

// react-navigation needs this to be a class
class HeaderSlideRight extends React.Component<Props> {
  props: Props;

  handlePress = () => {
    this.props.toggleGodMode();
  };

  handleLongPress = () => {
    this.props.toggleFastSlide();
  };

  render() {
    const {count, isGodModeUser, isGodModeEnabled, isFastSlideEnabled} = this.props;

    if (count === undefined) {
      return null;
    }

    return (
      <HeaderSlideRightComponent
        count={count}
        isGodModeEnabled={isGodModeEnabled}
        isFastSlideEnabled={isFastSlideEnabled}
        isGodModeUser={isGodModeUser}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
      />
    );
  }
}

const mapStateToProps = (state: StoreState): ConnectedStateProps => {
  const progression = getCurrentProgression(state);
  const {hide, count} = getLives(state);

  return {
    count: (progression && !hide && count) || undefined,
    isGodModeUser: _isGodModeUser(state),
    isGodModeEnabled: _isGodModeEnabled(state),
    isFastSlideEnabled: _isFastSlideEnabled(state)
  };
};

const mapDispatchToProps: ConnectedDispatchProps = {
  toggleGodMode,
  toggleFastSlide
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderSlideRight);
