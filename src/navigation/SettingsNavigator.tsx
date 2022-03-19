import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StartScreen } from '../screens/StartScreen';

const Tab = createMaterialTopTabNavigator();

export const SettingsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="About" component={StartScreen} />
      <Tab.Screen name="Notifications" component={StartScreen} />
    </Tab.Navigator>
  );
};
