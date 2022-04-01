import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, StyleSheet, ScrollView, ActivityIndicator, StatusBar, Image } from 'react-native';

export const LoadingScreen = () => {
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
      <ScrollView style={styles.center}>
        <View style={styles.placeWrapper}>
          <Image
            resizeMode={'contain'}
            source={require('../images/world_map.png')}
            style={{
              width: '95%',
              height: 290,
              marginTop: 20,
            }}
          />
          <ActivityIndicator size={46} color="#ffffff" />
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
    alignItems: 'center',
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
