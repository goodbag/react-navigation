import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
// @ts-expect-error Getting private component
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';
import {
  type StackPresentationTypes,
  ScreenContentWrapper,
} from 'react-native-screens';

type ContainerProps = ViewProps & {
  stackPresentation: StackPresentationTypes;
  children: React.ReactNode;
};

/**
 * This view must *not* be flattened.
 * See https://github.com/software-mansion/react-native-screens/pull/1825
 * for detailed explanation.
 */
export let DebugContainer = (props: ContainerProps) => {
  return <ScreenContentWrapper {...props} />;
};

if (process.env.NODE_ENV !== 'production') {
  DebugContainer = (props: ContainerProps) => {
    const { stackPresentation, ...rest } = props;

    if (
      Platform.OS === 'ios' &&
      stackPresentation !== 'push' &&
      stackPresentation !== 'formSheet'
    ) {
      // This is necessary for LogBox
      return (
        <AppContainer>
          <ScreenContentWrapper {...rest} />
        </AppContainer>
      );
    }

    return <ScreenContentWrapper {...rest} />;
  };
}
