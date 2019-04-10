// @flow

import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {NovaSolidLocationsLocationPinQuestionMark1 as QuestionIcon} from '@coorpacademy/nova-icons';

import {SPACE} from '../const';

import logo from '../assets/images/logo-coorp.png';
import theme, {defaultHitSlop, BLUE_COORP_DARK, BLUE_COORP_LIGHT} from '../modules/theme';
import translations from '../translations';
import Carousel from '../containers/carousel';
import Button from './button';
import Image from './image';
import Space from './space';
import Html from './html';
import Gradient from './gradient';
import StepsIcon, {TARGET} from './steps-icon';

type Props = {|
  onPress: () => void,
  onAssistancePress: () => void,
  onStartDemoPress: () => void
|};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1
  },
  wrapper: {
    padding: theme.spacing.base
  },
  titlewrapper: {
    paddingBottom: theme.spacing.base
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.tiny
  },
  header: {
    color: 'white',
    textAlign: 'center'
  },
  carousel: {
    height: '40%'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImg: {
    width: 192,
    height: 35
  },
  button: {
    fontWeight: 'bold',
    fontSize: theme.fontSize.large,
    color: BLUE_COORP_LIGHT,
    textAlign: 'center'
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centeredContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  needHelp: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSize.medium,
    color: theme.colors.white
  },
  startDemo: {
    fontSize: theme.fontSize.large,
    color: theme.colors.white
  },
  questionIcon: {
    width: 21,
    height: 21
  }
});

export const TOP_COLOR = BLUE_COORP_DARK;
export const BOTTOM_COLOR = BLUE_COORP_LIGHT;

const Authentication = ({onPress, onStartDemoPress, onAssistancePress}: Props) => (
  <Gradient colors={[TOP_COLOR, BOTTOM_COLOR]} style={styles.gradient}>
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrapper, styles.logo]} testID="logo-header">
        <Image source={logo} style={styles.logoImg} />
      </View>
      <View style={styles.titlewrapper} testID="sign-in-header">
        <View style={[styles.headerContainer]}>
          <Html fontSize={theme.fontSize.large} style={styles.header} isTextCentered>
            {translations.loginHeader}
          </Html>
        </View>
      </View>
      <Carousel />
      <View style={styles.wrapper}>
        <Button isInverted isTextSecondary onPress={onPress} testID="scan-qr-code">
          <View style={styles.buttonWithIcon}>
            <StepsIcon iconName={TARGET} color={BLUE_COORP_LIGHT} height={30} width={30} />
            <Space />
            <Html fontSize={theme.fontSize.large} style={styles.button}>
              {translations.loginButton}
            </Html>
          </View>
        </Button>
        <Space type={SPACE.BASE} />
        <View style={styles.centeredContent}>
          <Html
            fontSize={theme.fontSize.large}
            style={styles.startDemo}
            onLinkPress={onStartDemoPress}
            anchorTextColor={theme.colors.white}
          >
            {translations.demoMode}
          </Html>
        </View>
        <Space type={SPACE.BASE} />
        <TouchableOpacity
          hitSlop={defaultHitSlop}
          onPress={onAssistancePress}
          style={styles.centeredContent}
        >
          <QuestionIcon color={theme.colors.white} style={styles.questionIcon} />
          <Space type={SPACE.TINY} />
          <Text style={styles.needHelp}>{translations.needHelp}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </Gradient>
);

export default Authentication;
