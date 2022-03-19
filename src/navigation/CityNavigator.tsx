import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StartScreen } from '../screens/StartScreen';
import { UserLocationScreen } from '../screens/UserLocationScreen';

const Tab = createMaterialTopTabNavigator();

export const CityNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => null}>
      <Tab.Screen name="City" component={UserLocationScreen} />
      <Tab.Screen name="Settings" component={StartScreen} />
    </Tab.Navigator>
  );
};
