import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { LoadingScreen } from '../screens/LoadingScreen';

const Tab = createMaterialTopTabNavigator();

export const SettingsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="About" component={LoadingScreen} />
      <Tab.Screen name="Notifications" component={LoadingScreen} />
    </Tab.Navigator>
  );
};
