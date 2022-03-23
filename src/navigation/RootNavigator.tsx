import React, { useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, StatusBar } from 'react-native';

import { useDispatch } from 'react-redux';

import { IRootState } from '../store/index';
import { CityScreen } from '../screens/CityScreen';
import { CityNavigator } from './CityNavigator';
import { SettingsNavigator } from './SettingsNavigator';
import { LoadingScreen } from '../screens/LoadingScreen';
import { CustomHeaderButton } from '../components/HeaderButton';

const Stack = createStackNavigator();

import { storeData, getData } from '../AsyncStorage';

export const RootNavigator = () => {
  console.log('ROOT NAVIGATION RENDER');
  const [activeCity, setActiveCity] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);

  const dispatch = useDispatch();



  // useEffect(() => {
  //   (async () => {
  //     storeData('settings', da);
  //   })();
  // }, [da]);

  // console.log("SETTINGS RED", settings);

  if (!isLoaded) {
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
  }

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
      <Stack.Screen name="Settings" component={SettingsNavigator} />
    </Stack.Navigator>
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
