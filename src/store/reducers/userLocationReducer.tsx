import Geolocation from 'react-native-geolocation-service';

import { SET_LOCATION } from '../types';
import { LocationActions } from '../actions/actions';

const userLocationState: Geolocation.GeoPosition = {
  coords: {
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: null,
    heading: null,
    speed: null,
    altitudeAccuracy: null,
  },
  timestamp: 0,
  mocked: true,
  provider: 'gps',
};

export const userLocationReducer = (state = userLocationState, action: LocationActions) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_LOCATION:
      // console.log('LR', action.payload);
      return {
        coords: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
          accuracy: action.payload.coords.accuracy,
          altitude: action.payload.coords.altitude,
          heading: action.payload.coords.heading,
          speed: action.payload.coords.speed,
          altitudeAccuracy: action.payload.coords.altitudeAccuracy,
        },
        timestamp: action.payload.timestamp,
        mocked: action.payload.mocked,
        provider: action.payload.provider,
      };
    default:
      state;
  }
  return state;
};
