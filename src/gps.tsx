import Geolocation from 'react-native-geolocation-service';

import { hasLocationPermission } from './permissions';

import { Alert, Platform } from 'react-native';
// import VIForegroundService from '@voximplant/react-native-foreground-service';

import appConfig from '../app.json';

export const gpsCurrentPosMode: Geolocation.GeoOptions = {
  accuracy: {
    android: 'high',
    ios: 'best',
  },
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 0,
  forceRequestLocation: true,
  forceLocationManager: false,
  showLocationDialog: true,
};

export const gpsWatchPosMode: Geolocation.GeoWatchOptions = {
  accuracy: {
    android: 'high',
    ios: 'best',
  },
  enableHighAccuracy: true,
  distanceFilter: 0,
  interval: 5000,
  fastestInterval: 2000,
  forceRequestLocation: true,
  forceLocationManager: false,
  showLocationDialog: true,
  useSignificantChanges: false,
};

// const [observing, setObserving] = useState(false);
// const [foregroundService, setForegroundService] = useState(false);

// const watchId = useRef(null);

// useEffect(() => {
//   return () => {
//     removeLocationUpdates();
//   };
// }, [removeLocationUpdates]);

export const getLocation = async () => {
  const hasPermission = await hasLocationPermission();

  // const getGPSPositionResolve: Geolocation.SuccessCallback = (position: Geolocation.GeoPosition) => {
  //   return position;
  // };

  if (!hasPermission) {
    return null;
  }

  const result = new Promise<Geolocation.GeoPosition>((res, rej) => {
    Geolocation.getCurrentPosition(res, error => rej(getGPSPositionReject(error)), gpsCurrentPosMode);
  });

  const getGPSPositionReject: Geolocation.ErrorCallback = (error: Geolocation.GeoError): Geolocation.GeoError => {
    Alert.alert(`Code ${error.code}`, error.message);
    console.log('EEEEERRRRROORRRR', error);
    return error;
  };

  // return new Promise<Geolocation.GeoPosition | Geolocation.GeoError>((resolve, reject) => {
  //   Geolocation.getCurrentPosition(
  //     position => resolve(position),
  //     error => reject(getGPSPositionReject(error)),
  //     gpsCurrentPosMode,
  //   );
  // });

  return result;
};

// const getLocationUpdates = async () => {
//   const hasPermission = await hasLocationPermission();

//   if (!hasPermission) {
//     return;
//   }

//   if (Platform.OS === 'android' && foregroundService) {
//     await startForegroundService();
//   }

//   setObserving(true);

//   watchId.current = Geolocation.watchPosition(
//     position => getGPSPositionResolve(position),
//     error => getGPSPositionReject(error),
//     gpsWatchPosMode,
//   );
// };

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

// const stopForegroundService = useCallback(() => {
//   VIForegroundService.stopService().catch((err) => err);
// }, []);
