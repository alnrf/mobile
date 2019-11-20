// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import type {NetInfoState} from '@react-native-community/netinfo';

// import {update} from '../redux/actions/connection';

type ConnectedStateProps = {|
  isConnected: boolean
|};

type ConnectedDispatchProps = {|
  // update: typeof update
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps
|};

class ConnectionListener extends React.PureComponent<Props> {
  props: Props;

  unsubscriber: (() => void) | null;

  componentDidMount() {
    this.unsubscriber = NetInfo.addEventListener(this.handleChange);
  }

  componentWillUnmount() {
    this.unsubscriber && this.unsubscriber();
  }

  handleChange = (state: NetInfoState) => {
    console.log('@handleChange', state);

    if (state.isConnected !== this.props.isConnected) {
      this.props.update(state.isConnected);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  isConnected: state.connection.isConnected
});

const mapDispatchToProps: ConnectedDispatchProps = {
  // @todo rollback
  update: isConnected => console.log('@mock update', isConnected)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionListener);
