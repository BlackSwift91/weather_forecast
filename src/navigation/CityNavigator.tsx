import React, { useEffect, useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LoadingScreen } from '../screens/LoadingScreen';
import { CityScreen } from '../screens/CityScreen';



import { weatherFetch } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../store/actions/actions';
import { IRootState } from '../store/index';

import { storeData, getData } from '../AsyncStorage';

const Tab = createMaterialTopTabNavigator();

export const CityNavigator = () => {
  const dispatch = useDispatch();


  const [screens, setScreens] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(true);

  const [refreshing, setRefreshing] = React.useState(false);

  const userLocation = useSelector((state: IRootState) => state.userLocationReducer.coords);
  const locations = useSelector((state: IRootState) => state.weatherReducer.locationWeather);

  // console.log('333333333', userLocation);

  // useEffect(() => {
  //   (async () => {

  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if (userLocation.latitude) {
        console.log('WEATHER FETCH');
        weatherFetch(userLocation.latitude, userLocation.longitude, ['hourly', 'minutely'], 1).then(res => {
          if (res.status && res.payload) {
            dispatch(updateLocation(res.payload, 0));
            setIsLoaded(true);
            // storeData('first', res.payload);
          }
        });
      }
    })();
  }, [dispatch, userLocation]);

  // useEffect(() => {
  //   (async () => {
  //     const resd = await getData('first');
  //     console.log("ASYNCDATA", resd);
  //   })();
  // }, [dispatch, userLocation]);

  // useEffect(() => {
  //   (async () => {
  //     ;
  //   })();
  // }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     if (locations[0].location.name) {
  //       setScreens(locations.map((loc) => <Tab.Screen name={loc.location.name} component={CityScreen} key={loc.id} />))
  //       setIsLoaded(true);
  //     }
  //   })();
  // }, [locations]);

  if (!isLoaded) {
    return (
      <Tab.Navigator tabBar={() => null}>
        <Tab.Screen name="Settings" component={LoadingScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator tabBar={() => null}>
      {/* {screens} */}
      <Tab.Screen name="City" component={CityScreen} />
    </Tab.Navigator>
  );
};
