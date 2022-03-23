import Geolocation from 'react-native-geolocation-service';

import { ILocation, IOneAPIResponse, ILWReducer, ILocationWeather, ISettings } from '../../interfaces';

import { getData } from '../../AsyncStorage';

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
      type: 'INITIAL_DATA_LOAD';
      payload: {
        data: ILWReducer[];
      };
    }
  | {
      type: 'UPDATE_PLACE';
      payload: {
        place: { weather: IOneAPIResponse; location: ILocation; id: number };
      };
    }
  | {
      type: 'ADD_PLACE';
      payload: {
        weather: IOneAPIResponse;
        location: ILocation;
      };
    };

export async function locationsInit(dispatch) {
  const fetchResult = await getData('first');
  // console.log("FR", fetchResult);
  dispatch({ type: 'INITIAL_DATA_LOAD', payload: fetchResult });
}

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
        id: id,
      },
    },
  };
}

export type SettingActions =
  | {
      type: 'LOAD_INITIAL_SETTINGS';
      payload: {
        isAsyncDataLoaded: boolean;
        isAsyncSettingsLoaded: boolean;
        settings: {
          updateGeoLocation: boolean;
          updateTime: number;
          language: string;
          temperatureUnits: string;
          windSpeedUnits: string;
        };
      };
    }
  | {
      type: 'SET_LANGUAGE';
      payload: {
        language: string;
      };
    };

export async function settingsInit(dispatch) {
  const fetchResult: ISettings = await getData('settings');
  dispatch({ type: 'LOAD_INITIAL_SETTINGS', payload: fetchResult });
}

export function setLanguage(language: string): SettingActions {
  return {
    type: 'SET_LANGUAGE',
    payload: {
      language,
    },
  };
}
