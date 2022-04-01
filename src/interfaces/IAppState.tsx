export interface ISettings {
  updateGeoLocation: boolean;
  updateTime: number;
  language: string;
  temperatureUnits: string;
  windSpeedUnits: string;
}

export interface IAppState {
  settings: ISettings;
  activeScreen: number | null;
  isLoadedFromStorage: boolean;
}
