// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {NovaSolidSpaceRingPlanet as RingPlanet} from '@coorpacademy/nova-icons';

import {handleFakePress} from '../utils/tests';
import Modal from './modal';
import type {Props} from './modal';
import Text from './text';

type State = {|
  isVisible: boolean
|};

// This thing is to be able to close the modal in storybook
class ModalTester extends React.PureComponent<Props, State> {
  props: Props;

  state: State = {
    isVisible: false
  };

  componentDidMount() {
    this.reset(this.props.isVisible);
  }

  reset = (isVisible?: boolean = false) =>
    this.setState({
      isVisible
    });

  handleClose = () => this.reset();

  render() {
    return <Modal {...this.props} onClose={this.handleClose} isVisible={this.state.isVisible} />;
  }
}

const renderIcon = () => <RingPlanet color="#f00" height={60} width={60} />;

storiesOf('Modal', module)
  .add('Default', () => (
    <ModalTester onClose={handleFakePress}>
      <Text>Hidden modal</Text>
    </ModalTester>
  ))
  .add('Visible', () => (
    <ModalTester isVisible onClose={handleFakePress}>
      <Text>Visible modal</Text>
    </ModalTester>
  ))
  .add('Custom header and icon background color', () => (
    <ModalTester
      isVisible
      renderIcon={renderIcon}
      headerBackgroundColor="rgba(0, 128, 0, 0.2)"
      iconBackgroundColor="rgba(0, 128, 0, 0.2)"
      onClose={handleFakePress}
    >
      <Text>Modal with header and icon</Text>
    </ModalTester>
  ));
