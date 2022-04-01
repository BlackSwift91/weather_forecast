import { createSlice, PayloadAction, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import Geolocation from 'react-native-geolocation-service';

import { Alert } from 'react-native';

import { IAppState } from '../interfaces/IAppState';

import { getLocation, gpsCurrentPosMode } from '../gps';

import { getAsyncData, setAsyncData } from '../AsyncStorage';

import { hasLocationPermission } from '../permissions';

interface ILocationReducer {
  locationState: Geolocation.GeoPosition | null;
  status: 'idle' | 'loading' | 'resolved' | 'rejected';
  error: {} | null;
}

const initialState: ILocationReducer = {
  locationState: null,
  status: 'idle',
  error: null,
};

export const loadLocationState = createAsyncThunk('locationState/loadLocationState', async function () {
  // const result = await getLocation();
  // if (result) {
  //   return result;
  // }

  // const getGPSPositionResolve = (position: Geolocation.GeoPosition) => {
  //   return Promise.resolve(position);
  // };

  // const getGPSPositionReject: Geolocation.ErrorCallback = (error: Geolocation.GeoError) => {
  //   Alert.alert(`Code ${error.code}`, error.message);
  //   return Promise.reject(error);
  // };

  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return Promise.reject('Location permission denied by user.');
  }

  // Geolocation.getCurrentPosition(
  //   position => getGPSPositionResolve(position),
  //   error => getGPSPositionReject(error),
  //   gpsCurrentPosMode,
  // );

  const getGPSPositionReject: Geolocation.ErrorCallback = (error: Geolocation.GeoError): Geolocation.GeoError => {
    Alert.alert(`Code ${error.code}`, error.message);
    console.log('EEEEERRRRROORRRR', error);
    return error;
  };

  const result = new Promise<Geolocation.GeoPosition>((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, error => reject(getGPSPositionReject(error)), gpsCurrentPosMode);
  });

  return result;
});

export const locationSlice = createSlice({
  name: 'locationState',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Geolocation.GeoPosition | null>) => {
      state.locationState = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadLocationState.pending, state => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadLocationState.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.locationState = action.payload;
    });
    builder.addCase(loadLocationState.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    });
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
