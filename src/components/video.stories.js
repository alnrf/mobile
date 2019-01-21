// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Video from './video';

storiesOf('Video', module).add('Default', () => (
  <Video
    testID="basic-video"
    source="https://content.jwplatform.com/videos/Piqz1Sdy.mp4"
    preview="https://assets-jpcust.jwpsrv.com/thumbnails/2ad64hgq-720.jpg"
  />
));
