// @flow

import * as React from 'react';
import {View} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export type Layout = {|
  width: number,
  height: number
|};

export type WithLayoutProps = {|
  onLayout?: LayoutEvent => void,
  layout?: Layout,
  containerStyle?: ViewStyleProp
|};

function withLayout<P>(
  WrappedComponent: React$ComponentType<P>,
  options?: {
    withoutContainer?: boolean
  }
): React$ComponentType<$Exact<{|...WithLayoutProps, ...P|}>> {
  type Props = $Exact<{|
    ...P,
    ...WithLayoutProps
  |}>;
  type State = {|
    layout?: Layout
  |};
  class ComponentWithLayout extends React.PureComponent<Props, State> {
    props: Props;

    state: State = {
      layout: undefined
    };

    handleLayout = ({nativeEvent: {layout}}: LayoutEvent) =>
      this.setState({
        layout
      });

    render() {
      const containerStyle: ViewStyleProp = this.props.containerStyle;

      if (options && options.withoutContainer) {
        return (
          <WrappedComponent
            {...this.props}
            layout={this.state.layout}
            onLayout={this.handleLayout}
          />
        );
      }

      return (
        <View onLayout={this.handleLayout} style={containerStyle}>
          <WrappedComponent {...this.props} layout={this.state.layout} />
        </View>
      );
    }
  }

  return hoistNonReactStatic(ComponentWithLayout, WrappedComponent);
}

export default withLayout;
