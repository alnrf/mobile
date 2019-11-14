// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {handleFakePress} from '../utils/tests';
import {ERROR_TYPE} from '../const';
import ModalError from './modal-error';

storiesOf('ModalError', module)
  .add('No content found', () => (
    <ModalError
      type={ERROR_TYPE.NO_CONTENT_FOUND}
      onPress={handleFakePress}
      onAssistancePress={handleFakePress}
      onClose={handleFakePress}
    />
  ))
  .add('Platform not activated', () => (
    <ModalError
      type={ERROR_TYPE.PLATFORM_NOT_ACTIVATED}
      onPress={handleFakePress}
      onClose={handleFakePress}
      onAssistancePress={handleFakePress}
    />
  ));
