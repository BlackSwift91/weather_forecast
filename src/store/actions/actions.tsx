import Geolocation from 'react-native-geolocation-service';

import { ILocation, IOneAPIResponse, ILWReducer, ILocationWeather } from '../../interfaces';

export type LocationActions = {
  type: 'SET_USER_LOCATION';
  payload: {
    coords: {
      latitude: number;
      longitude: number;
      accuracy: number;
      altitude: number | null;
      heading: number | null;
      speed: number | null;
      altitudeAccuracy?: number | null;
    };
    timestamp: number;
    mocked?: boolean;
    provider?: 'fused' | 'gps' | 'network' | 'passive';
  };
};

export function setUserLocation(position: Geolocation.GeoPosition): LocationActions {
  return {
    type: 'SET_USER_LOCATION',
    payload: {
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        heading: position.coords.heading,
        speed: position.coords.speed,
        altitudeAccuracy: position.coords.altitudeAccuracy,
      },
      timestamp: position.timestamp,
      mocked: position.mocked,
      provider: position.provider,
    },
  };
}

export type WeatherActions =
  | {
      type: 'UPDATE_PLACE';
      payload: {
        place: { weather: IOneAPIResponse; location: ILocation };
        id: number;
      };
    }
  | {
      type: 'ADD_PLACE';
      payload: {
        weather: IOneAPIResponse;
        location: ILocation;
      };
    };

// export function setWeather(weather: IOneAPIResponse): WeatherActions {
//   return {
//     type: 'SET_WEATHER',
//     payload: {
//       weather: {
//         lat: weather.lat,
//         lon: weather.lon,
//         timezone: weather.timezone,
//         timezone_offset: weather.timezone_offset,
//         current: weather.current,
//         minutely: weather.minutely,
//         hourly: weather.hourly,
//         daily: weather.daily,
//         alerts: weather.alerts,
//       },
//     },
//   };
// }

export function addLocation(place: ILWReducer): WeatherActions {
  return {
    type: 'ADD_PLACE',
    payload: {
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
    },
  };
}

export function updateLocation(location: ILocationWeather, id: number): WeatherActions {
  return {
    type: 'UPDATE_PLACE',
    payload: {
      place: {
        weather: {
          lat: location.weather.lat,
          lon: location.weather.lon,
          timezone: location.weather.timezone,
          timezone_offset: location.weather.timezone_offset,
          current: location.weather.current,
          minutely: location.weather.minutely,
          hourly: location.weather.hourly,
          daily: location.weather.daily,
          alerts: location.weather.alerts,
        },
        location: {
          name: location.location.name,
          local_names: { ...location.location.local_names },
          lat: location.location.lat,
          lon: location.location.lon,
          country: location.location.country,
          state: location.location?.state,
        },
      },
      id: id,
    },
  };
}
