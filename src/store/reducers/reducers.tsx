import Geolocation from 'react-native-geolocation-service';

import { SET_LOCATION, UPDATE_PLACE, ADD_PLACE } from '../types';
import { LocationActions, WeatherActions } from '../actions/actions';

import { IWeatherState } from '../../interfaces';

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

const weatherState: IWeatherState = {
  locationWeather: [
    {
      weather: {
        lat: 0,
        lon: 0,
        timezone: '',
        timezone_offset: 0,
        current: undefined,
        minutely: undefined,
        hourly: undefined,
        daily: undefined,
        alerts: [],
      },
      location: {
        name: '',
        local_names: {},
        lat: 0,
        lon: 0,
        country: '',
        state: '',
      },
      id: 0,
      isActiveScreen: true,
    },
  ],
  lastUpdate: null,
};

export const weatherReducer = (state = weatherState, action: WeatherActions) => {
  // console.log(action.type);
  switch (action.type) {
    case ADD_PLACE:
      // console.log('AP', action.payload);
      return {
        ...state, //spreading the original state
        locationWeather: [...state.locationWeather, action.payload],
      };
    case UPDATE_PLACE:
      console.log('UP', action.payload);
      const newArray = [...state.locationWeather]; //making a new array
      newArray[action.payload.id].location = action.payload.place.location;
      newArray[action.payload.id].weather = action.payload.place.weather;
      console.log('TIME', action.payload.place.weather.current?.dt);

      return {
        ...state, //spreading the original state
        locationWeather: [...newArray],
        lastUpdate: action.payload.place.weather.current?.dt,
      };

    default:
      state;
  }
  return state;
};
