// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import type {Lesson as LessonType} from '../services/content/types';
import {RESSOURCE_TYPE} from '../const';
import theme from '../modules/theme';
import Video from '../containers/video-controlable';
import withLayout from '../containers/with-layout';
import type {WithLayoutProps} from '../containers/with-layout';
import QuestionTitle from './question-title';
import Space from './space';

type Props = {|
  ...WithLayoutProps,
  header: string,
  resources: Array<LessonType>
|};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.base,
    flexGrow: 1
  },
  questionContainer: {
    paddingHorizontal: theme.spacing.xlarge
  }
});

const Lesson = ({layout, header, resources}: Props) => {
  // @todo other US, iterate over resources
  const resource: LessonType = resources.filter(item => item.type === RESSOURCE_TYPE.VIDEO)[0];
  const video = resource && resource.mediaUrl.replace(/(http:|https:|)\/\//g, 'https://');
  const poster = resource && resource.poster.replace(/(http:|https:|)\/\//g, 'https://');
  const ccTracks = resource && resource.ccTracks;
  const ccSelectedTrack = resource && resource.ccSelectedTrack;

  return (
    <View testID="lesson" style={styles.container}>
      <View style={styles.questionContainer}>
        <QuestionTitle>{header}</QuestionTitle>
      </View>
      <Space type="base" />
      {video &&
        poster &&
        layout && (
          <Video
            source={{uri: video}}
            preview={{uri: poster}}
            height={layout.width / (16 / 9)}
            textTracks={ccTracks}
            selectedTextTrack={ccSelectedTrack}
            isCC
          />
        )}
    </View>
  );
};

export {Lesson as Component};
export default withLayout(Lesson);
