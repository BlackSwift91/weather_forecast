import React, { useState, useEffect, useCallback, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { RootNavigator } from './RootNavigator';

import { gpsCurrentPosMode, gpsWatchPosMode } from '../gpsSettings';
import { hasLocationPermission } from '../permissions';
import { setUserLocation, setWeather } from '../store/actions/actions';

export const AppNavigation = () => {
  const [observing, setObserving] = useState(false);

  const watchId = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      getLocation();
    })();
  }, []);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

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

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => getGPSPositionResolve(position),
      error => getGPSPositionReject(error),
      gpsWatchPosMode,
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err) => err);
  }, []);

  return <RootNavigator />;
};
