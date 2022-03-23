import { ISettings } from '../../interfaces';

import { SettingActions } from '../actions/actions';
import { LOAD_INITIAL_SETTINGS, SET_LANGUAGE } from '../types';

import { initialSettings } from '../../InitialData';

const appData: ISettings | {} = {};

export const appReducer = (state = appData, action: SettingActions) => {
  // console.log(action.type);
  switch (action.type) {
    case LOAD_INITIAL_SETTINGS:
      console.log('LOAD_INITIAL_SETTINGS', action.payload);
      if (!action.payload) {
        console.log('empty settings');
        return {
          ...initialSettings,
          activeScreen: 0,
        };
      } else {
        console.log('settings loaded');
        return {
          ...action.payload,
          activeScreen: 0,
          isAsyncDataLoaded: false,
          isAsyncSettingsLoaded: false,
        };
      }

    case SET_LANGUAGE:
      console.log('S_LANGUAGE', action.payload);
      return {
        ...state,
        language: action.payload.language,
      };
    default:
      state;
  }
  return state;
};
