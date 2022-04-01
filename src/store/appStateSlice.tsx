import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IAppState } from '../interfaces/IAppState';

import { getAsyncData, setAsyncData } from '../AsyncStorage';

const initailAppState: IAppState = {
  settings: {
    updateGeoLocation: true,
    updateTime: 60,
    language: 'ru',
    temperatureUnits: 'metric',
    windSpeedUnits: 'm/s',
  },
  activeScreen: null,
  isLoadedFromStorage: false,
};

interface IAppStateReducer {
  appState: IAppState | null;
  status: 'idle' | 'loading' | 'resolved' | 'rejected';
  error: string | null;
}

const initialState: IAppStateReducer = {
  appState: null,
  status: 'loading',
  error: null,
};

export const loadAppState = createAsyncThunk('appState/loadAppState', async function () {
  const response: IAppState = await getAsyncData('appData');
  if (!response) {
    await setAsyncData('appData', initailAppState);
    return initailAppState;
  }
  return response;
});

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<IAppState>) => {
      if (state.appState) {
        state.appState.activeScreen = action.payload.activeScreen;
      }
    },
    setLanguage: (state, action: PayloadAction<IAppState>) => {
      if (state.appState) {
        state.appState.settings.language = action.payload.settings.language;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadAppState.pending, state => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadAppState.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.appState = action.payload;
      state.appState.isLoadedFromStorage = true;
    });
  },
});

export const { setActiveScreen, setLanguage } = appStateSlice.actions;

export default appStateSlice.reducer;
