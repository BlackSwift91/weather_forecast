import { configureStore } from '@reduxjs/toolkit';

import appStateSlice from './appStateSlice';
import locationSlice from './locationSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    locationState: locationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
