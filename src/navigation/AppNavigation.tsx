import React, { useState, useEffect, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from '../store/index';

import { RootNavigator } from './RootNavigator';
import { LoadingNavigator } from './LoadingNavigator';
import { setUserLocation } from '../store/actions/actions';
import { hasLocationPermission } from '../permissions';
import { gpsCurrentPosMode, gpsWatchPosMode } from '../gpsSettings';

import { storeData, getData } from '../AsyncStorage';

export const AppNavigation = () => {
  console.log('APP NAVIGATION RENDER');
  const [isAsyncDataLoaded, setIsAsyncDataLoaded] = React.useState(false);
  const [isAsyncSettingsLoaded, setIsAsyncSettingsLoaded] = React.useState(false);

  const weather = useSelector((state: IRootState) => state.weatherReducer);
  const settings = useSelector((state: IRootState) => state.appReducer);

  console.log('CONSOLELOG', settings);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 1200000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    (async () => {
      if (!isAsyncSettingsLoaded && settings.settings) {
        storeData('settings', settings);
        setIsAsyncSettingsLoaded(true);
        setIsAsyncDataLoaded(true);
      }
    })();
  }, [isAsyncSettingsLoaded, settings]);

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

  const getGPSPositionResolve: Geolocation.SuccessCallback = (position: Geolocation.GeoPosition) => {
    dispatch(setUserLocation(position));
  };

  const getGPSPositionReject: Geolocation.ErrorCallback = (error: Geolocation.GeoError): void => {
    Alert.alert(`Code ${error.code}`, error.message);
    // setLocation(null);
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => getGPSPositionResolve(position),
      error => getGPSPositionReject(error),
      gpsCurrentPosMode,
    );
  };

  // const getLocationUpdates = async () => {
  //   const hasPermission = await hasLocationPermission();

  //   if (!hasPermission) {
  //     return;
  //   }

  //   // if (Platform.OS === 'android' && foregroundService) {
  //   //   await startForegroundService();
  //   // }

  //   setObserving(true);

  //   Geolocation.watchPosition(
  //     position => getGPSPositionResolve(position),
  //     error => getGPSPositionReject(error),
  //     gpsWatchPosMode,
  //   );
  // };

  // const stopForegroundService = useCallback(() => {
  //   VIForegroundService.stopService().catch((err) => err);
  // }, []);

  // const removeLocationUpdates = useCallback(() => {
  //   if (watchId.current !== null) {
  //     stopForegroundService();
  //     Geolocation.clearWatch(watchId.current);
  //     watchId.current = null;
  //     setObserving(false);
  //   }
  // }, [stopForegroundService]);

  // const startForegroundService = async () => {
  //   if (Platform.Version >= 26) {
  //     await VIForegroundService.createNotificationChannel({
  //       id: 'locationChannel',
  //       name: 'Location Tracking Channel',
  //       description: 'Tracks location of user',
  //       enableVibration: false,
  //     });
  //   }

  //   return VIForegroundService.startService({
  //     channelId: 'locationChannel',
  //     id: 420,
  //     title: appConfig.displayName,
  //     text: 'Tracking location updates',
  //     icon: 'ic_launcher',
  //   });
  // };

  if (isAsyncDataLoaded && isAsyncSettingsLoaded) {
    return <RootNavigator />;
  }

  return <LoadingNavigator />;
};
