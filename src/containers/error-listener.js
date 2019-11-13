// @flow

import React from 'react';
import Modal from 'react-native-modal';
import {Linking} from 'react-native';
import {connect} from 'react-redux';

import ErrorModal from '../components/error-modal';
import type {ErrorType} from '../types';
import {ERROR_TYPE} from '../const';
import {hideError, refresh} from '../redux/actions/ui/errors';
import {signOut} from '../redux/actions/authentication';
import {assistanceEmail} from '../../app';

type ConnectedStateToProps = {|
  ...ReactNavigation$WithNavigationProps,
  isVisible: boolean,
  errorType: ErrorType,
  lastAction?: () => void
|};

type ConnectedDispatchProps = {|
  hideError: typeof hideError,
  refresh: typeof refresh,
  signOut: typeof signOut
|};

export type Props = {|
  ...ConnectedStateToProps,
  ...ConnectedDispatchProps,
  onClose: () => void
|};

class ErrorListener extends React.PureComponent<Props> {
  props: Props;

  handleAssistancePress = () => {
    Linking.openURL(`mailto:${assistanceEmail}`);
  };

  handleClose = () => {
    this.props.hideError();
    this.props.signOut();
    this.props.onClose();
  };

  handlePress = () => {
    if (this.props.errorType === ERROR_TYPE.PLATFORM_NOT_ACTIVATED) {
      this.handleAssistancePress();
    } else {
      this.props.refresh();
    }
  };

  render() {
    const {errorType} = this.props;

    return (
      <Modal
        isVisible={this.props.isVisible}
        onSwipeComplete={this.handleClose}
        onBackdropPress={this.handleClose}
      >
        <ErrorModal
          onClose={this.handleClose}
          onPress={this.handlePress}
          onAssistancePress={this.handleAssistancePress}
          type={errorType}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({error}: StoreState): ConnectedStateToProps => ({
  isVisible: error.isVisible,
  errorType: error.errorType,
  lastAction: error.lastAction
});

const mapDispatchToProps: ConnectedDispatchProps = {
  hideError,
  refresh,
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorListener);
