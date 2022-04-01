import { ILocationName } from './ILocationName';
import { IWeatherForecast } from './IWeatherForecast';

export interface IPlaceWeather {
  location: ILocationName;
  weather: IWeatherForecast;
  lastUpdate: number | null;
}

export interface IPlaceWeatherData extends IPlaceWeather {
  id: number;
}

export interface IPlaceWeatherResponse {
  payload: IPlaceWeather | null;
  status: boolean;
}

export interface IWeatherState {
  locationWeather: IPlaceWeatherData[] | null;
}
