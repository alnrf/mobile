// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import SelectComponent from '../components/select';
import type {Props as ComponentProps} from '../components/select';
import type {StoreState} from '../redux/store';
import {getFocusedSelect} from '../redux/utils/state-extract';
import {focus, blur} from '../redux/actions/ui/select';

type ConnectedStateProps = {|
  isFocused: boolean
|};

type ConnectedDispatchProps = {|
  focus: typeof focus,
  blur: typeof blur
|};

export type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  ...$Rest<
    ComponentProps,
    {|
      onBlur: $PropertyType<ComponentProps, 'onBlur'>,
      onFocus: $PropertyType<ComponentProps, 'onFocus'>
    |}
  >,
  id: string
|};

class Select extends React.PureComponent<Props> {
  props: Props;

  handleFocus = () => this.props.focus({key: this.props.id});

  handleBlur = () => this.props.blur();

  render() {
    const {
      /* eslint-disable no-unused-vars */
      id,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    return <SelectComponent {...props} onFocus={this.handleFocus} onBlur={this.handleBlur} />;
  }
}

export const mapStateToProps = (state: StoreState, {id}: Props): ConnectedStateProps => ({
  isFocused: getFocusedSelect(state) === id
});

const mapDispatchToProps: ConnectedDispatchProps = {
  focus,
  blur
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
