// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Button from '../components/button';
import Space from '../components/space';
import Screen from '../components/screen';
import Video from '../containers/video-controlable';
import theme from '../modules/theme';
import {setLivesProgression} from '../redux/actions/progression';

type ConnectedDispatchProps = {|
  setLivesProgression: typeof setLivesProgression
|};

type Props = ReactNavigation$ScreenProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.base,
    justifyContent: 'flex-end'
  }
});

class HomeScreen extends React.PureComponent<Props> {
  props: Props;

  static navigationOptions = ({navigationOptions, navigation}: ReactNavigation$ScreenProps) => ({
    ...navigationOptions,
    headerMode: 'none',
    headerStyle: {
      ...navigationOptions.headerStyle,
      height: 0
    }
  });

  handlePress = (lives?: number) => () => {
    this.props.setLivesProgression(lives);
    this.props.navigation.navigate('Slide');
  };

  render() {
    return (
      <Screen testID="home-screen" noScroll>
        <View style={styles.container} testID="home">
          <Video
            source={{uri: 'https://content.jwplatform.com/videos/Piqz1Sdy.mp4'}}
            preview={{
              uri:
                'https://static1.squarespace.com/static/5b0f605e697a98b4a292e4f0/t/5ba17e8a2b6a283ca7aed3e7/1537310369390/Composition-photo-paysage.jpg'
            }}
            textTracks={[
              {
                title: 'German CC',
                language: 'de',
                type: 'text/vtt', // "text/vtt"
                uri:
                  'https://alanlanglois.net/https266296680hdmp4sbb8ba7fa2f35cf447571022ca3007cb6437a373eprofile_id175.de.vtt'
              }
            ]}
            selectedTextTrack={{
              type: 'language',
              value: 'de'
            }}
            height={300 / (16 / 9)}
          />
          <Space />
          <Button onPress={this.handlePress(3)} testID="button-start-course-with-lives">
            Start a course
          </Button>
          <Space />
          <Button onPress={this.handlePress()} testID="button-start-course-without-lives">
            Start a course without lives
          </Button>
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps: ConnectedDispatchProps = {
  setLivesProgression
};

export default connect(null, mapDispatchToProps)(HomeScreen);
