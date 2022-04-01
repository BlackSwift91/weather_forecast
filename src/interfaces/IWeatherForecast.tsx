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

export interface IWeatherForecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ICurrent | null;
  minutely: IMinutely[] | null;
  hourly: IHourly[] | null;
  daily: IDaily[] | null;
  alerts: IAlerts[] | null;
}
