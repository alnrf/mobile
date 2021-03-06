// @flow

import * as React from 'react';
import {View} from 'react-native';
import type {LessonType} from '@coorpacademy/progression-engine';

import withLayout from '../containers/with-layout';
import type {WithLayoutProps} from '../containers/with-layout';
import {RESOURCE_TYPE} from '../const';
import type {MimeType} from '../types';
import VideoControlable from '../containers/video-controlable';
import {getCleanUri} from '../modules/uri';
import {getVideoProvider} from '../modules/media';
import Preview, {EXTRALIFE} from './preview';
import ImageBackground from './image-background';

type Props = {|
  ...WithLayoutProps,
  type: LessonType,
  url?: string,
  videoId?: string,
  mimeType?: MimeType,
  testID?: string,
  thumbnail?: string,
  description?: string,
  onPress?: (url?: string, description?: string) => void,
  style?: ViewStyleProp,
  resizeMode?: 'cover' | 'contain' | 'center' | 'repeat' | 'stretch',
  extralifeOverlay?: boolean
|};

class Resource extends React.PureComponent<Props> {
  props: Props;

  handlePress = () => {
    const {url, description, onPress} = this.props;

    onPress && url && onPress(getCleanUri(url), description);
  };

  render() {
    const {
      type,
      url,
      videoId,
      mimeType,
      layout,
      testID,
      thumbnail = '',
      resizeMode = 'contain',
      extralifeOverlay = false,
      style
    } = this.props;

    const height = layout && layout.width / (16 / 9);

    if (!layout) {
      return null;
    }

    switch (type) {
      case RESOURCE_TYPE.VIDEO: {
        return (
          <VideoControlable
            source={{uri: url && getCleanUri(url)}}
            id={videoId}
            provider={mimeType && getVideoProvider(mimeType)}
            testID={testID}
            preview={{uri: thumbnail && getCleanUri(thumbnail)}}
            height={height}
            extralifeOverlay={extralifeOverlay}
            style={style}
            onPlay={this.handlePress}
          />
        );
      }
      case RESOURCE_TYPE.PDF: {
        return (
          <View style={{...style, height}}>
            <Preview
              testID={testID}
              type={extralifeOverlay ? EXTRALIFE : RESOURCE_TYPE.PDF}
              source={{uri: thumbnail && getCleanUri(thumbnail)}}
              onPress={this.handlePress}
            />
          </View>
        );
      }

      case RESOURCE_TYPE.IMG: {
        return (
          <ImageBackground
            testID={testID}
            source={{uri: url && getCleanUri(url)}}
            resizeMode={resizeMode}
            style={{
              ...style,
              height: (style && style.height) || height, // it was too risky to refactor this so here we cover every possible case
              width: layout && layout.width
            }}
          />
        );
      }
      default:
        return null;
    }
  }
}
export {Resource as Component};
export default withLayout(Resource);
