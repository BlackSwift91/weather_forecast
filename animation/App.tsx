/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, useColorScheme, View, Button } from 'react-native';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
// } from 'react-native-reanimated';

import { Slider } from './src/components/Slider';

// const MyComponent: React.FC = () => {
//   const x = useSharedValue(0);

//   const boxStyle = useAnimatedStyle(() => {
//     return {
//       width: 100,
//       height: 100,
//       backgroundColor: 'red',
//       // Animate translateX
//       transform: [{ translateX: x.value }, { translateY: x.value }],
//     };
//   });

//   return (
//     <View>
//       <Button title="Increment x" onPress={() => (x.value += 1)} />
//       <Animated.View style={boxStyle} />
//     </View>
//   );
// };

// import * as React from 'react';
// import { Button } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

const MyComponent: React.FC = () => {
  const x = useSharedValue(0);

  const onPress = () => {
    x.value = withTiming(200, { duration: 200 });
  };

  return <Button title="Increment x" onPress={onPress} />;
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text> Hello World </Text>
      <MyComponent />
      <View style={{ height: 20, marginTop: 30, marginHorizontal: 20 }}>
        <Slider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
