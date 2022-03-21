import { createStore, combineReducers } from 'redux';

import { userLocationReducer, weatherReducer } from './reducers/reducers';

import Geolocation from 'react-native-geolocation-service';

import { IWeatherState } from '../interfaces';

// import { IUserData, IUserLocation, IAuthData, ISettings } from './reducers/reducers';

export interface IRootState {
  userLocationReducer: Geolocation.GeoPosition;
  weatherReducer: IWeatherState;
}

const rootReducer = combineReducers({ userLocationReducer, weatherReducer });

export const store = createStore(rootReducer);
