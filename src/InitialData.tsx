import { ISettings } from './interfaces/IWeatherState';

export const initialSettings: ISettings = {
  settings: {
    updateGeoLocation: true,
    updateTime: 60,
    language: 'ru',
    temperatureUnits: 'metric',
    windSpeedUnits: 'm/s',
  },
};
