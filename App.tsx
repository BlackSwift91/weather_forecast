/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useColorScheme, LogBox } from 'react-native';
import { AppNavigation } from './src/navigation/AppNavigation';

import 'react-native-gesture-handler';

// import appConfig from '../app.json';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import { store } from './src/store/';
import { Provider } from 'react-redux';

import { locationsInit, settingsInit } from './src/store/actions/actions';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  store.dispatch(settingsInit);
  // store.dispatch(locationsInit);

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
