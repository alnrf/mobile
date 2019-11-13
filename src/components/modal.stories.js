// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Modal from './modal';
import Text from './text';

const children = <Text>Something to display</Text>;

storiesOf('Modal', module)
  .add('Default', () => <Modal>{children}</Modal>)
  .add('Visible', () => <Modal isVisible>{children}</Modal>);
