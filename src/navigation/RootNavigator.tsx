import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StartScreen } from '../screens/StartScreen';
import { CityScreen } from '../screens/UserLocationScreen';

import { CityNavigator } from './CityNavigator';
import { SettingsNavigator } from './SettingsNavigator';

import { CustomHeaderButton } from '../components/HeaderButton';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTransparent: true,
      }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                IconComponent={MaterialCommunityIcons}
                color="#ffffff"
                title="menu"
                iconName="menu"
                onPress={() => alert('search')}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                IconComponent={MaterialCommunityIcons}
                color="#ffffff"
                title="vertical menu"
                iconName="dots-vertical"
                onPress={() => alert('search')}
              />
            </HeaderButtons>
          ),
          title: '',
        }}
        name="CityList"
        component={CityNavigator}
      />
      {/* <Stack.Screen name="Settings" component={SettingsNavigator} /> */}
    </Stack.Navigator>
  );
};

export const WeatherNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => null}>
      <Tab.Screen name="Weather" component={CityScreen} />
    </Tab.Navigator>
  );
};
