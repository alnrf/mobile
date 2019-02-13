// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import {fetchRequest as fetchDisciplineBundle} from '../redux/actions/discipline-bundle';
import {__E2E__} from '../modules/environment';

type ConnectedDispatchProps = {|
  fetchDisciplineBundle: typeof fetchDisciplineBundle
|};

type Props = {|
  ...ConnectedDispatchProps
|};

class NetworkInfoListener extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    if (__E2E__) {
      // @todo handle languages there dynamically
      this.props.fetchDisciplineBundle('fixtures_basic', ['fr', 'en']);
    } else {
      // @todo handle languages there dynamically
      this.props.fetchDisciplineBundle('fixtures_onboarding', ['fr', 'en']);
    }
  }

  // @todo manage connection change to fetch real content when the user is online

  render() {
    return null;
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  fetchDisciplineBundle
};

export default connect(null, mapDispatchToProps)(NetworkInfoListener);
