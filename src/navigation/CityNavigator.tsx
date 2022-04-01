import React from 'react';

import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { IRootState } from '../oldstore/index';
import { CityScreen } from '../screens/CityScreen';

const Tab = createMaterialTopTabNavigator();

export const CityNavigator = () => {
  // const locations = useSelector((state: IRootState) => state.weatherReducer.locationWeather);

  // const screens = locations.map(loc => (
  //   <Tab.Screen name={loc.location.name} component={CityScreen} key={loc.id} initialParams={{ screenId: loc.id }} />
  // ));

  return (
    <Tab.Navigator tabBar={() => null}>
      <Tab.Screen name="City" component={CityScreen} initialParams={{ screenId: 1234 }} />
      {/* {screens} */}
    </Tab.Navigator>
  );
};
