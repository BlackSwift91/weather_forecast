interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICurrent {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: IWeather[];
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
}

interface IMinutely {
  dt: number;
  precipitation: number;
}

interface IAlerts {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface IDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: IWeather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface IHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IWeather[];
  pop: number;
}

// interface ILocation {
//   name: string;
//   local_names: {
//     [key: string]: string;
//     af: string;
//     ar: string;
//     ascii: string;
//     az: string;
//     bg: string;
//     ca: string;
//     da: string;
//     de: string;
//     el: string;
//     en: string;
//     eu: string;
//     fa: string;
//     feature_name: string;
//     fi: string;
//     fr: string;
//     gl: string;
//     he: string;
//     hi: string;
//     hr: string;
//     hu: string;
//     id: string;
//     it: string;
//     ja: string;
//     la: string;
//     lt: string;
//     mk: string;
//     nl: string;
//     no: string;
//     pl: string;
//     pt: string;
//     ro: string;
//     ru: string;
//     sk: string;
//     sl: string;
//     sr: string;
//     th: string;
//     tr: string;
//     vi: string;
//     zu: string;
//   };
//   lat: number;
//   lon: number;
//   country: string;
//   state?: string;
// };

export interface ILocation {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface IOneAPIResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ICurrent | undefined;
  minutely: IMinutely[] | undefined;
  hourly: IHourly[] | undefined;
  daily: IDaily[] | undefined;
  alerts: IAlerts[] | undefined;
}

export interface ILocationWeather {
  location: ILocation;
  weather: IOneAPIResponse;
  id: number;
}

export interface ILWReducer extends ILocationWeather {
  isActiveScreen?: boolean;
}

export interface ILWFetch {
  payload: ILocationWeather | undefined;
  status: boolean;
}

export interface IWeatherState {
  locationWeather: ILWReducer[];
  lastUpdate: number | null;
}

export interface ISettings {
  settings: {
    updateGeoLocation: boolean;
    updateTime: number;
    language: string;
    temperatureUnits: string;
    windSpeedUnits: string;
  };
}

export interface IAppReducer {
  isASDataLoaded: boolean;
}
