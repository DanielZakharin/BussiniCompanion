
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {
  useColorScheme
} from 'react-native';
import apolloClient from './apollographql/apolloclient';
import Pattern from './src/Pattern/pattern';
import Routes from './src/Routes/routes';
import Stops from './src/Stops/stops';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationParamList, NavigationScreens } from './src/common/navigation/navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator<NavigationParamList>()

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Routes'>
          <Stack.Screen name={NavigationScreens.Routes} component={Routes} options={{ title: "Select Route" }} />
          <Stack.Screen name={NavigationScreens.Pattern} component={Pattern} options={{ title: "Select Direction" }} />
          <Stack.Screen name={NavigationScreens.Stop} component={Stops} options={{ title: "Select Stop" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider >
  );
}

export default App;
