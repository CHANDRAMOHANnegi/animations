import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// console.log(HEIGHT);
const CARD_HEIGHT = 120;
const CARD_WIDTH = 300;
const SPACING = 5;
const BUTTON_WIDTH = 60;
const BUTTON_SPACING = 20;
const VERTICAL_SPACING = 5;

const fixTwo = (num) => {
  "worklet";
  return num.toFixed(2);
};

export const Card = ({ title, text, translateY, index }) => {
  const rStyle = useAnimatedStyle(() => {
    const active_index = parseInt(translateY.value / CARD_HEIGHT);
    const absY = fixTwo(translateY.value % CARD_HEIGHT);

    const width = interpolate(
      translateY.value,
      [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [CARD_WIDTH, CARD_WIDTH, CARD_WIDTH, 60],
      Extrapolate.CLAMP
    );

    const translatex = interpolate(
      translateY.value,
      [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [0, 0, 0, index * (BUTTON_WIDTH + BUTTON_SPACING)],
      Extrapolate.CLAMP
    );

    const height = interpolate(
      translateY.value,
      [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT, 60],
      Extrapolate.CLAMP
    );

    const active_height = interpolate(
      absY,
      [-1, 0, CARD_HEIGHT],
      [CARD_HEIGHT, CARD_HEIGHT, 60],
      Extrapolate.CLAMP
    );

    let translatey = interpolate(
      translateY.value,
      [
        -1,
        0,
        CARD_HEIGHT * index,
        CARD_HEIGHT * (index + 1 / 2),
        CARD_HEIGHT * (index + 1),
      ],
      [
        translateY.value,
        translateY.value,
        translateY.value,
        translateY.value,
        translateY.value - 60 * index,
      ],
      Extrapolate.CLAMP
    );

    const diff = interpolate(absY, [0, 60, 120], [0, 0, 60], Extrapolate.CLAMP);
    if (index > active_index) {
      if (active_index > 0) {
        translatey -= diff;
      }
    }

    if (index < 3) {
      console.log(index, active_index);
      console.log(
        `idx:${index}=> Y: ${fixTwo(translateY.value)}, y: ${fixTwo(
          translatey
        )}, absY: ${absY}, height: ${fixTwo(height)}, diff: ${fixTwo(diff)}  `
      );
      // console.log({absY});
      // console.log("-->", index, {
      //   Y: fixTwo(translateY.value),
      //   ['y']: fixTwo(translatey),
      //   height: fixTwo(height),
      //   absY,
      //   active_height: fixTwo(active_height),
      // });
    }

    return {
      transform: [{ translateY: translatey }, { translateX: translatex }],
      height,
      width,
    };
  });

  const iStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-1, 0, CARD_HEIGHT * (index + 1), CARD_HEIGHT * (index + 2)],
      [1, 1, 0, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          alignItems: "center",
          backgroundColor: "transparent",
          height: CARD_HEIGHT,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "red",
          marginHorizontal: 10 * SPACING,
        },
        rStyle,
      ]}
    >
      <View>
        <View style={styles.text}>
          <Text>{title}</Text>
        </View>
        <Animated.View style={iStyle}>
          <View>
            <Text>{text}</Text>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 30,
    backgroundColor: "red",
  },
});
