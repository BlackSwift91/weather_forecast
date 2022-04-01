import { IOneAPIResponse, ILocation, ILWFetch } from './interfaces/IWeatherState';

interface IDirectGeocoding {
  city: string;
  limit: number;
}

interface IReverseGeocoding {
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

export const reverseGeocoding = async (data: IReverseGeocoding): Promise<ILocation[]> => {
  // eslint-disable-next-line prettier/prettier
  return await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=${data.limit}&appid=${API_KEY}`)
    .then(res => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      const error = res.status;
      return Promise.reject(error);
    })
    .catch(error => {
      console.error('Reverse Geocoding fetch error', error);
    });
};

export const oneCallApi = async (data: IOneCallApi): Promise<IOneAPIResponse> => {
  // eslint-disable-next-line prettier/prettier
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=${data.exclude.join(',')}&appid=${API_KEY}&units=metric&lang=ru`)
    .then(res => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      const error = res.status;
      return Promise.reject(error);
    })
    .catch(error => {
      console.error('One Call API fetch error', error);
    });
};

export const weatherFetch = async (latitude: number, longitude: number, exclude: string[], limit: number): Promise<ILWFetch> => {
  const result = Promise.all([
    oneCallApi({ lat: latitude, lon: longitude, exclude: exclude }),
    reverseGeocoding({ lat: latitude, lon: longitude, limit: limit }),
  ]).then(values => {
    if (values[0] && values[1]) {
      return {
        payload: {
          weather: values[0],
          location: values[1][0],
          lastUpdate: Date.now(),
        },
        status: true,
      };
    } else {
      return {
        payload: null,
        status: false,
      };
    }
  });
  return result;
};
