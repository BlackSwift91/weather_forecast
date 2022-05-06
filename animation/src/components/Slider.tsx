import * as React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
// import { COLOR } from '../consts';
import { View, Button } from 'react-native';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const HANDLE_WIDTH = 20;

export const Slider: React.FC = () => {
  // Shared values
  const sliderWidth = useSharedValue(0);
  const progress = useSharedValue(0);

  /**
   * Animated style for handle, translated based on progress.
   */
  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value - HANDLE_WIDTH / 2 }],
    };
  });

  // For illustrative purposes, we'll update progress on an interval.
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     progress.value = withSpring(Math.random() * sliderWidth.value);
  //   }, 1500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startProgress: number }
  >({
    // On start, make note of the progress value at start of gesture.
    onStart: (_, ctx) => {
      ctx.startProgress = progress.value;
    },
    // On pan, new progress is the starting progress plus change in position
    onActive: (event, ctx) => {
      progress.value = ctx.startProgress + event.translationX;
    },
    // On pan-end, snap back to 0 or sliderWidth if out of bounds.
    onEnd: () => {
      if (progress.value > sliderWidth.value) {
        progress.value = withSpring(sliderWidth.value);
      } else if (progress.value < 0) {
        progress.value = withSpring(0);
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgb(234,234,234)',
        justifyContent: 'flex-end',
        borderRadius: 10,
      }}
      onLayout={e => {
        sliderWidth.value = e.nativeEvent.layout.width;
      }}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={[
            {
              width: HANDLE_WIDTH,
              backgroundColor: 'green',
              borderRadius: 10,
              position: 'absolute',
              bottom: -10,
              top: -10,
            },
            animatedHandleStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};
