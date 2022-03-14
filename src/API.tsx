interface IDirectGeocoding {
  city: string;
  limit: number;
}

interface IReverseGeocoding {
  city: string;
  lat: number;
  lon: number;
  limit: number;
}

interface IOneCallApi {
  lat: number;
  lon: number;
  exclude: Array<string>;
}

const API_KEY = '6236b23ddef4258dd860790bdbea3e08';

export const directGeocoding = async (data: IDirectGeocoding) => {
  // eslint-disable-next-line prettier/prettier
  return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${data.city}&limit=${data.limit}&appid=${API_KEY}`).then(res => res.json());
};

export const reverseGeocoding = async (data: IReverseGeocoding) => {
  // eslint-disable-next-line prettier/prettier
  return await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=${data.limit}&appid=${API_KEY}`).then(res => res.json());
};

export const oneCallApi = async (data: IOneCallApi) => {
  // eslint-disable-next-line prettier/prettier
  return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=${data.exclude.join(',')}&appid=${API_KEY}`).then(res => res.json());
};
