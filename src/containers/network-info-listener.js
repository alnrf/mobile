// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import {fetchCards} from '../redux/actions/cards';
import {fetchBrand} from '../redux/actions/brands';

type ConnectedDispatchProps = {|
  fetchCards: typeof fetchCards,
  fetchBrand: typeof fetchBrand
|};

type Props = {|
  ...ConnectedDispatchProps
|};

class NetworkInfoListener extends React.PureComponent<Props> {
  props: Props;

  async componentDidMount() {
    await this.props.fetchBrand();
    // @todo use dynamic language
    await this.props.fetchCards('en');
  }

  // @todo manage connection change to fetch real content when the user is online

  render() {
    return null;
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  fetchCards,
  fetchBrand
};

export default connect(null, mapDispatchToProps)(NetworkInfoListener);
