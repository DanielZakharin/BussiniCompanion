/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  useColorScheme
} from 'react-native';
import apolloClient from './apollographql/apolloclient';
import Pattern from './src/Pattern/pattern';
import Routes from './src/Routes/routes';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { RouteData } from './src/Routes/types';
import { PatternScreenProps } from './src/Pattern/types';

// NAVIGATION

export enum NavigationScreens {
  Routes = 'Routes',
  Pattern = 'Pattern'
}

type ParamList = {
  Routes: undefined,
  Pattern: PatternScreenProps,
}

export type NavigationProps = NativeStackScreenProps<ParamList, NavigationScreens>

// APP

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator<ParamList>()

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Routes'>
          <Stack.Screen name={NavigationScreens.Routes} component={Routes} options={{ title: "Select Route" }} />
          <Stack.Screen name={NavigationScreens.Pattern} component={Pattern} options={{ title: "Select Direction" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider >
  );
}

export default App;
