
import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
  useColorScheme
} from 'react-native';
import apolloClient from './apollographql/apolloclient';
import Pattern from './src/Pattern/pattern';
import Routes from './src/Routes/routes';
import Stops from './src/Stops/stops';
import StopDisplay from './src/StopDisplay/stopdisplay';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationParamList, NavigationScreens } from './src/common/navigation/navigation';
import { StorageManager } from './src/common/storage';
import Splash from './src/Splash/splash';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // TODO do something with this, move to styles
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator<NavigationParamList>()

  const [loading, setLoading] = useState(true)
  const [hasRouteSelected, setHasRouteSelected] = useState<boolean | undefined>(undefined) // three state boolean... 

  useEffect(() => {
    const checkHasRouteSelected = async () => {
      const hasValues = (await Promise.all([
        StorageManager.readKeyValuePair('PATTERN_GTFS_ID_KEY'),
        StorageManager.readKeyValuePair('STOP_ID_KEY')
      ])).every((res) => !!res)

      setHasRouteSelected(hasValues)
    }
    if (hasRouteSelected === undefined) {
      checkHasRouteSelected()
    } else {
      setLoading(false)
    }
  })

  if (loading) {
    return <Splash />
  } else {
    // TODO this might be smelly
    // could have a totally separate <Stack.Navigator /> element for each state
    const initial = hasRouteSelected ? 'StopDisplay' : 'Routes'
    return (
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initial}>
            <Stack.Screen name={NavigationScreens.Routes} component={Routes} options={{ title: "Select Route" }} />
            <Stack.Screen name={NavigationScreens.Pattern} component={Pattern} options={{ title: "Select Direction" }} />
            <Stack.Screen name={NavigationScreens.Stop} component={Stops} options={{ title: "Select Stop" }} />
            <Stack.Screen name={NavigationScreens.StopDisplay} component={StopDisplay} options={{ title: "Departures" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider >
    );
  }
}

export default App;
