import React, { useEffect } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Text, StyleSheet, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StartScreen } from '../screens/StartScreen';
import { CityScreen } from '../screens/CityScreen';

import { CityNavigator } from './CityNavigator';
// import { SettingsNavigator } from './SettingsNavigator';

import { CustomHeaderButton } from '../components/HeaderButton';

import { IRootState } from '../store/index';

import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const RootNavigator = () => {
  console.log('ROOTNAVIGATION RENDER');
  const [activeCity, setActiveCity] = React.useState('');

  const data = useSelector((state: IRootState) => state.weatherReducer.locationWeather);

  useEffect(() => {
    (async () => {
      if (data[0].location.name) {
        setActiveCity(data.filter(item => item.isActiveScreen === true)[0].location.local_names.ru);
      }
    })();
  }, [data]);

  console.log('ACTIVE CITY', activeCity);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTransparent: true,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text style={styles.placeCityText}>
              <Icon name="map-marker-radius-outline" size={26} color="#fff" />
              {activeCity}
            </Text>
          ),
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },

  version: {
    fontFamily: 'open-bold',
  },
  linearGradient: {
    flex: 1,
  },
  placeWrapper: {
    marginTop: 40 + Number(StatusBar.currentHeight?.toFixed(0)),
  },
  placeCityText: {
    color: '#ffffff',
    paddingTop: 6,
    fontSize: 24,
    textAlign: 'center',
  },
  placeTemperatureText: {
    color: '#ffffff',
    paddingTop: 0,
    paddingLeft: 25,
    fontSize: 64,
    textAlign: 'center',
    fontWeight: '300',
  },
  placeWeatherDescriptionText: {
    color: '#ffffff',
    paddingTop: 0,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },
  placeRealFeelText: {
    color: '#ffffff',
    paddingTop: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },
});
