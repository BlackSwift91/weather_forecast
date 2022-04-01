import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncData = async (key: string, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('DATA STORED', key, value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    console.log('ERROR WHILE SAVING DATA', e);
  }
};

export const getAsyncData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('ERROR WHILE GETTING DATA', e);
  }
};
