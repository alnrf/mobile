// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {NovaSolidSpaceRingPlanet as RingPlanet} from '@coorpacademy/nova-icons';

import {handleFakePress} from '../utils/tests';
import Modal from './modal';
import Text from './text';

const renderIcon = () => <RingPlanet color="#f00" height={60} width={60} />;

storiesOf('Modal', module)
  .add('Default', () => (
    <Modal onClose={handleFakePress}>
      <Text>Some content</Text>
    </Modal>
  ))
  .add('Custom header and icon background color', () => (
    <Modal
      renderIcon={renderIcon}
      headerBackgroundColor="rgba(0, 128, 0, 0.2)"
      iconBackgroundColor="rgba(0, 128, 0, 0.2)"
      onClose={handleFakePress}
    >
      <Text>Modal with header and icon</Text>
    </Modal>
  ));
