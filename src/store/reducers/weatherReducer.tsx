import { UPDATE_PLACE, ADD_PLACE, INITIAL_DATA_LOAD } from '../types';
import { WeatherActions } from '../actions/actions';

import { IWeatherState } from '../../interfaces';

// const weatherState: IWeatherState = {
//   locationWeather: [
//     {
//       weather: {
//         lat: 0,
//         lon: 0,
//         timezone: '',
//         timezone_offset: 0,
//         current: undefined,
//         minutely: undefined,
//         hourly: undefined,
//         daily: undefined,
//         alerts: [],
//       },
//       location: {
//         name: '',
//         local_names: {},
//         lat: 0,
//         lon: 0,
//         country: '',
//         state: '',
//       },
//       id: 0,
//       isActiveScreen: true,
//     },
//   ],
//   lastUpdate: null,
// };

const weatherState: IWeatherState = {
  locationWeather: [],
  lastUpdate: null,
};

export const weatherReducer = (state = weatherState, action: WeatherActions) => {
  // console.log(action.type);
  switch (action.type) {
    case INITIAL_DATA_LOAD:
      console.log('INITIAL_DATA_LOAD', action.payload);
      const initData = action.payload;

      return {
        ...state,
        locationWeather: [...initData],
      };

    case ADD_PLACE:
      // console.log('AP', action.payload);
      return {
        ...state,
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
