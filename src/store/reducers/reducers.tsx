import Geolocation from 'react-native-geolocation-service';

import { SET_LOCATION, SET_WEATHER, SET_LOCATION_NAME, UPDATE_PLACE, ADD_PLACE } from '../types';
import { LocationActions, WeatherActions } from '../actions/actions';

import { IWeatherState } from '../../interface';

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
  console.log(action.type);
  switch (action.type) {
    case SET_LOCATION:
      console.log('LR', action.payload);
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

const weatherState: IWeatherState = {
  locationWeather: [],
};

export const weatherReducer = (state = weatherState, action: WeatherActions) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_PLACE:
      console.log('AP', action.payload);
      return {
        ...state, //spreading the original state
        locationWeather: [action.payload, ...state.locationWeather],
      };
    default:
      state;
  }
  return state;
};

// weather: {
  //   lat: action.payload.weather.lat,
  //   lon: action.payload.weather.lon,
  //   timezone: action.payload.weather.timezone,
  //   timezone_offset: action.payload.weather.timezone_offset,
  //   current: action.payload.weather.current,
  //   minutely: action.payload.weather.minutely,
  //   hourly: action.payload.weather.hourly,
  //   daily: action.payload.weather.daily,
  //   alerts: action.payload.weather.alerts,
  // },