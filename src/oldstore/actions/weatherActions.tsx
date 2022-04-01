import { ILocation, IOneAPIResponse, IDataPlaceWeather, IPlaceWeather } from '../../interfaces/IWeatherState';
import { getData } from '../../AsyncStorage';

export type TWeatherActions =
  | {
      type: 'INITIAL_DATA_LOAD';
      payload: {
        weatherData: IDataPlaceWeather[] | null;
      };
    }
  | {
      type: 'ADD_PLACE';
      payload: {
        data: IPlaceWeather | undefined;
      };
    }
  | {
      type: 'UPDATE_PLACE';
      payload: {
        place: { weather: IOneAPIResponse; location: ILocation; id: number };
      };
    };

export function setAsyncData(data: IDataPlaceWeather[] | null): TWeatherActions {
  return {
    type: 'INITIAL_DATA_LOAD',
    payload: {
      weatherData: data,
    },
  };
}

// export async function dataInit(dispatch) {
//   const asyncData: IDataPlaceWeather[] | null = await getData('weather');
//   dispatch({ type: 'INITIAL_DATA_LOAD', payload: { weatherData: asyncData } });
// }

export async function dataInit(dispatch) {
  const asyncData: IDataPlaceWeather[] | null = await getData('weather');
  dispatch(setAsyncData(asyncData));
}

export function addPlace(place: IPlaceWeather): TWeatherActions {
  return {
    type: 'ADD_PLACE',
    payload: {
      data: {
        weather: {
          lat: place.weather.lat,
          lon: place.weather.lon,
          timezone: place.weather.timezone,
          timezone_offset: place.weather.timezone_offset,
          current: place.weather.current,
          minutely: place.weather.minutely,
          hourly: place.weather.hourly,
          daily: place.weather.daily,
          alerts: place.weather.alerts,
        },
        location: {
          name: place.location.name,
          local_names: { ...place.location.local_names },
          lat: place.location.lat,
          lon: place.location.lon,
          country: place.location.country,
          state: place.location?.state,
        },
        lastUpdate: place.lastUpdate,
      },
    },
  };
}

export function updateLocation(place: IPlaceWeather, id: number): TWeatherActions {
  return {
    type: 'UPDATE_PLACE',
    payload: {
      place: {
        weather: {
          lat: place.weather.lat,
          lon: place.weather.lon,
          timezone: place.weather.timezone,
          timezone_offset: place.weather.timezone_offset,
          current: place.weather.current,
          minutely: place.weather.minutely,
          hourly: place.weather.hourly,
          daily: place.weather.daily,
          alerts: place.weather.alerts,
        },
        location: {
          name: place.location.name,
          local_names: { ...place.location.local_names },
          lat: place.location.lat,
          lon: place.location.lon,
          country: place.location.country,
          state: place.location?.state,
        },
        id: id,
      },
    },
  };
}
