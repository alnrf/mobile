// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import type {Choice, QuestionType} from '@coorpacademy/progression-engine';

import Select from '../components/select';
import type {StoreState} from '../redux/store';
import {getFocusedSelect} from '../redux/utils/state-extract';
import {focus, blur} from '../redux/actions/ui/select';

import type {WithAnalyticsProps} from './with-analytics';

type ConnectedStateProps = {|
  isFocused: boolean
|};

type ConnectedDispatchToProps = {|
  focus: typeof focus,
  blur: typeof blur
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchToProps,
  ...WithAnalyticsProps,
  analyticsID: string,
  key: string,
  questionType: QuestionType,
  isDisabled?: boolean,
  values: $NonMaybeType<$PropertyType<Choice, 'items'>>,
  value?: string,
  placeholder?: string,
  color?: string,
  onChange: (value: string) => void,
  style?: TextStyleProp,
  testID?: string
|};

export const mapStateToProps = (state: StoreState, props: Props): ConnectedStateProps => {
  const {key} = props;

  return {
    isFocused: getFocusedSelect(state) === key
  };
};

const mapDispatchToProps: ConnectedDispatchToProps = {
  focus,
  blur
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
