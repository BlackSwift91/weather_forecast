/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, useColorScheme, LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { getLocation } from './src/gpsSettings';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { Navigator } from './src/navigation/navigation';
import 'react-native-gesture-handler';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  const [gpsSettings, setGpsSettings] = useState({
    forceLocation: true,
    highAccuracy: true,
    locationDialog: true,
    significantChanges: true,
    useLocationManager: false,
  });
  const [location, setLocation] = useState(null);


  const gpsCurrentPosMode = {
    accuracy: {
      android: 'high',
      ios: 'best',
    },
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 0,
    forceRequestLocation: true,
    forceLocationManager: false,
    showLocationDialog: true,
  };

  console.log(gpsCurrentPosMode);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <NavigationContainer theme={navTheme}>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
