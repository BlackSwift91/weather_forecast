import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { directGeocoding, oneCallApi } from '../API';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const CityScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    (async () => {
      const result = await oneCallApi({ lat: 51.5098, lon: -0.1180, exclude: ['hourly', 'minutely'] });
      console.log(result);
    })();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.linearGradient}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="default"
        showHideTransition="fade"
        translucent={true}
        hidden={false} />
      <ScrollView
        style={styles.center}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.placeWrapper}>
          <Text style={styles.placeCityText}>
            <Icon name="map-marker-radius-outline" size={26} color="#fff" />
            Zhytomyr
          </Text>
          <Text style={styles.placeTemperatureText}>-4°</Text>
          <Text style={styles.placeWeatherDescriptionText}>
            Преимущественно облачно
          </Text>
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
