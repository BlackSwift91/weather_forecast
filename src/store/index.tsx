import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import { weatherReducer } from './reducers/weatherReducer';
import { userLocationReducer } from './reducers/userLocationReducer';
import { appReducer } from './reducers/appReducer';

import Geolocation from 'react-native-geolocation-service';

import { IWeatherState, ISettings } from '../interfaces';

export interface IRootState {
  userLocationReducer: Geolocation.GeoPosition;
  weatherReducer: IWeatherState;
  appReducer: ISettings;
}

const composedEnhancer = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({ userLocationReducer, weatherReducer, appReducer });

export const store = createStore(rootReducer, composedEnhancer);
