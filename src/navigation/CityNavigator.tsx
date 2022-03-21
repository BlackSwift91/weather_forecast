import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StartScreen } from '../screens/StartScreen';
import { CityScreen } from '../screens/CityScreen';

const Tab = createMaterialTopTabNavigator();

export const CityNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => null}>
      <Tab.Screen name="City" component={CityScreen} />
      {/* <Tab.Screen name="City1" component={UserLocationScreen} /> */}
      <Tab.Screen name="Settings" component={StartScreen} />
    </Tab.Navigator>
  );
};
