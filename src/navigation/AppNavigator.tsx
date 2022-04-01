import React, { useState, useEffect, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../oldstore/index';
import { weatherFetch } from '../API';

import { RootState } from '../store/index';

import { RootNavigator } from './RootNavigator';
import { LoadingNavigator } from './LoadingNavigator';
import { setUserLocation, setActiveScreen } from '../oldstore/actions/actions';
import { addPlace } from '../oldstore/actions/weatherActions';
import { hasLocationPermission } from '../permissions';
import { gpsCurrentPosMode, gpsWatchPosMode } from '../gps';

import { storeData, getData } from '../AsyncStorage';


import { loadAppState } from '../store/appStateSlice';
import { loadLocationState } from '../store/locationSlice';

export const AppNavigator = () => {
  console.log('APP NAVIGATION RENDER');
  const dispatch = useDispatch();
  const [isAsyncDataLoaded, setIsAsyncDataLoaded] = React.useState(false);
  const [isAsyncSettingsLoaded, setIsAsyncSettingsLoaded] = React.useState(false);

  const weather = useSelector((state: RootState) => state.appState);
  const location = useSelector((state: RootState) => state.locationState);
  // const settings = useSelector((state: IRootState) => state.appReducer);
  // const userLocation = useSelector((state: IRootState) => state.userLocationReducer.coords);

  console.log("WEA", weather);
  console.log("LOC", location);

  useEffect(() => {
    (async () => {
      dispatch(loadAppState());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(loadLocationState());
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     // console.log('GET LOCATION');
  //     getLocation();
  //   })();
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getLocation();
  //   }, 1200000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (!isAsyncSettingsLoaded && settings.settings) {
  //       storeData('settings', settings);
  //       setIsAsyncSettingsLoaded(true);
  //     }
  //   })();
  // }, [settings]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('111111');
  //     if (!isAsyncDataLoaded && !weather.locationWeather && userLocation.latitude) {
  //       console.log('22222');
  //       weatherFetch(userLocation.latitude, userLocation.longitude, ['hourly', 'minutely'], 1).then(res => {
  //         if (res.status && res.payload) {
  //           dispatch(addPlace(res.payload));
  //         }
  //       });
  //     }
  //   })();
  // }, [dispatch, userLocation.latitude, weather.locationWeather]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('333333');
  //     if (!isAsyncDataLoaded && weather.locationWeather) {
  //       console.log('444444');
  //       storeData('weather', weather.locationWeather);
  //       setIsAsyncDataLoaded(true);
  //     }
  //   })();
  // }, [dispatch, isAsyncDataLoaded, weather.locationWeather]);

  // useEffect(() => {
  //   (async () => {
  //     if (!isAsyncDataLoaded && weather.locationWeather[0]) {
  //       dispatch(setActiveScreen());
  //     }
  //   })();
  // }, [isAsyncDataLoaded, settings, weather, weather.locationWeather]);

  // const [observing, setObserving] = useState(false);
  // const [foregroundService, setForegroundService] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     console.log('GET LOCATION');
  //     getLocation();
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       getLocationUpdates();
  //     } catch (e) {
  //       console.log('ERROR WHILE FIRST INIT', e);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     removeLocationUpdates();
  //   };
  // }, [removeLocationUpdates]);

  // if (isAsyncDataLoaded && isAsyncSettingsLoaded) {
  //   return <RootNavigator />;
  // }

  return <LoadingNavigator />;
};
