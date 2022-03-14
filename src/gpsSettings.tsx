import Geolocation from 'react-native-geolocation-service';

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
