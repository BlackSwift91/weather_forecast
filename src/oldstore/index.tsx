import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import { weatherReducer } from './reducers/weatherReducer';
import { userLocationReducer } from './reducers/userLocationReducer';
import { appReducer } from './reducers/appReducer';

import Geolocation from 'react-native-geolocation-service';

import { IWeatherState, IAppReducer } from '../interfaces/IWeatherState';

export interface IRootState {
  userLocationReducer: Geolocation.GeoPosition;
  weatherReducer: IWeatherState;
  appReducer: IAppReducer;
}

const composedEnhancer = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({ userLocationReducer, weatherReducer, appReducer });

export const store = createStore(rootReducer, composedEnhancer);
