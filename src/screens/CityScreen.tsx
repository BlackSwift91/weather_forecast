import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { weatherFetch } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../store/actions/actions';
import { IRootState } from '../store/index';

export const CityScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const dispatch = useDispatch();

  const userLocation = useSelector((state: IRootState) => state.userLocationReducer.coords);
  const test = useSelector((state: IRootState) => state.weatherReducer.locationWeather);
  // const user = useSelector((state: IRootState) => state);

  //  console.log('222222222', test[0]);
  // console.log('333333333', userLocation);
  // console.log('3333333', cityName);

  // useEffect(() => {
  //   (async () => {
  //     if (userLocation.coords.latitude) {
  //       // reverseGeocoding({ lat: userLocation.coords.latitude, lon: userLocation.coords.longitude, limit: 2 }).then((res) => setWeatherUser(res));
  //     }
  //   })();
  // }, [userLocation, cityName]);

  useEffect(() => {
    (async () => {
      if (userLocation.latitude) {
        console.log('WEATHER FETCH');
        weatherFetch(userLocation.latitude, userLocation.longitude, ['hourly', 'minutely'], 1).then(res => {
          if (res.status && res.payload) {
            dispatch(updateLocation(res.payload, 0));
            setIsLoaded(true);
          }
        });
      }
    })();
  }, [dispatch, userLocation]);

  // useEffect(() => {
  //   (async () => {
  //     ;
  //   })();
  // }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (userLocation.latitude && userLocation.longitude) {
      console.log('REFRESH UPDATE');
      weatherFetch(userLocation.latitude, userLocation.longitude, ['hourly', 'minutely'], 1)
        .then(res => {
          if (res.status && res.payload) {
            dispatch(updateLocation(res.payload, 0));
            setIsLoaded(true);
          }
        })
        .then(() => setRefreshing(false));
    }
  }, [dispatch, userLocation.latitude, userLocation.longitude]);

  if (isLoaded) {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="default"
          showHideTransition="fade"
          translucent={true}
          hidden={false}
        />
        <ScrollView style={styles.center} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.placeWrapper}>
            <Text style={styles.placeTemperatureText}>{test[0]?.weather.current.temp.toFixed()}°</Text>
            <Text style={styles.placeWeatherDescriptionText}>{test[0]?.weather.current.weather[0].description}</Text>
            <Text style={styles.placeRealFeelText}>RealFeel {test[0]?.weather.current.feels_like.toFixed()}°</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="default"
        showHideTransition="fade"
        translucent={true}
        hidden={false}
      />
      <ScrollView style={styles.center} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.placeWrapper}>
          <Text style={styles.placeWeatherDescriptionText}>Loading</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },

  version: {
    fontFamily: 'open-bold',
  },
  linearGradient: {
    flex: 1,
  },
  placeWrapper: {
    marginTop: 40 + Number(StatusBar.currentHeight?.toFixed(0)),
  },
  placeCityText: {
    color: '#ffffff',
    paddingTop: 15,
    fontSize: 28,
    textAlign: 'center',
  },
  placeTemperatureText: {
    color: '#ffffff',
    paddingTop: 15,
    paddingLeft: 25,
    fontSize: 64,
    textAlign: 'center',
    fontWeight: '300',
  },
  placeWeatherDescriptionText: {
    color: '#ffffff',
    paddingTop: 0,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },
  placeRealFeelText: {
    color: '#ffffff',
    paddingTop: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300',
  },
});
