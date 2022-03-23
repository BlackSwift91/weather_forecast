import React from 'react';
import { LoadingScreen } from '../screens/LoadingScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const LoadingNavigator = () => {
  console.log('LOADING NAVIGATION RENDER');

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTransparent: true,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          title: '',
        }}
        name="CityList"
        component={LoadingScreen}
      />
    </Stack.Navigator>
  );
};
