import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { reverseGeocoding, oneCallApi, weatherFetch } from '../API';

import { useDispatch } from 'react-redux';

import { setWeather, setLocation, addLocation } from '../store/actions/actions';

import { IRootState } from '../store/index';

import { useSelector } from 'react-redux';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const UserLocationScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [cityName, setCityName] = React.useState('');
  const [weatherState, setWeatherState] = React.useState('');

  const dispatch = useDispatch();

  const userLocation = useSelector((state: IRootState) => state.userLocationReducer);
  const test = useSelector((state: IRootState) => state.weatherReducer);
  // const user = useSelector((state: IRootState) => state);

  console.log('222222222', test);
  // console.log('333333333', weatherState);
  // console.log('3333333', cityName);

  // useEffect(() => {
  //   (async () => {
  //     if (userLocation.coords.latitude) {
  //       // reverseGeocoding({ lat: userLocation.coords.latitude, lon: userLocation.coords.longitude, limit: 2 }).then((res) => setWeatherUser(res));
  //       // reverseGeocoding({ lat: userLocation.coords.latitude, lon: userLocation.coords.longitude, limit: 2 }).then((res) => console.log(res));
  //     }
  //   })();
  // }, [userLocation, cityName]);

  useEffect(() => {
    (async () => {
      weatherFetch(50.7509283, 25.3684933, ['hourly', 'minutely'], 1).then(value => dispatch(addLocation(value)));
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     ;
  //   })();
  // }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    oneCallApi({
      lat: userLocation.coords.latitude,
      lon: userLocation.coords.longitude,
      exclude: ['hourly', 'minutely'],
    })
      // .then(res => console.log(res))
      .then(() => setRefreshing(false));
    // reverseGeocoding({ lat: userLocation.coords.latitude, lon: userLocation.coords.longitude, limit: 2 }).then((res) => dispatch(setLocation(res))).then(() => setRefreshing(false));
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="default"
        showHideTransition="fade"
        translucent={true}
        hidden={false} />
      <ScrollView
        style={styles.center}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.placeWrapper}>
          <Text style={styles.placeCityText}>
            <Icon name="map-marker-radius-outline" size={26} color="#fff" />
            { }
          </Text>
          <Text style={styles.placeTemperatureText}>-4°</Text>
          <Text style={styles.placeWeatherDescriptionText}>Преимущественно облачно</Text>
          <Text style={styles.placeRealFeelText}>RealFeel -2</Text>
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
    paddingTop: 0,
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
