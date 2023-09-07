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
const CARD_HEIGHT = 180;
const CARD_WIDTH = 300;
const SPACING = 5;

const BUTTON_WIDTH = 60;
const BUTTON_SPACING = 20;

const TOTAL_BUTTON_WIDTH = BUTTON_WIDTH + BUTTON_SPACING;

const VERTICAL_SPACING = 10;
const FINAL_HEIGHT = 60;
const TOTAL_CARD_HEIGHT = CARD_HEIGHT + VERTICAL_SPACING;
const TOTAL_FINAL_CARD_HEIGHT = FINAL_HEIGHT + VERTICAL_SPACING;

const HORIZONTAL_SCROLL_START_BREAKPOINT = CARD_WIDTH * 0.2;

const fixTwo = (num) => {
  "worklet";
  return num.toFixed(2);
};

export const Card = ({ title, text, translateY, index }) => {
  const rStyle = useAnimatedStyle(() => {
    const active_index = parseInt(translateY.value / TOTAL_CARD_HEIGHT);

    const absY = fixTwo(translateY.value % TOTAL_CARD_HEIGHT);

    const widthScale = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, TOTAL_CARD_HEIGHT * (index + 1)],
      [1, 1, 1, 0.2],
      Extrapolate.CLAMP
    );

    const cardHeight = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, TOTAL_CARD_HEIGHT * (index + 1)],
      [CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT, FINAL_HEIGHT],
      Extrapolate.CLAMP
    );

    let diff = interpolate(
      absY,
      [0, TOTAL_CARD_HEIGHT / 2, TOTAL_CARD_HEIGHT],
      [0, 0, TOTAL_FINAL_CARD_HEIGHT],
      Extrapolate.CLAMP
    );

    // vertical scrolling

    let translatey = translateY.value;
    if (translateY.value > 0) {
      if (index > active_index) {
        if (active_index > 0) {
          translatey -= TOTAL_FINAL_CARD_HEIGHT * (active_index - 1) + diff;
        }
      } else if (index < active_index) {
        translatey -= TOTAL_FINAL_CARD_HEIGHT * index;
      } else {
        /***
         * index === active_index
         * active card
         * */
        if (index > 0) {
          translatey -= TOTAL_FINAL_CARD_HEIGHT * (index - 1) + diff; //+ 60 * (index-1);
        }
      }
    } else {
      translatey = 0;
    }

    // vertical scrolling end

    // horizontal scrolling

    // let translatex=0;
    let translatex = 0;

    const xDiff = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [0, 0, 0, index * TOTAL_BUTTON_WIDTH],
      Extrapolate.CLAMP
    );

    if (index < active_index) {
      translatex = withTiming(index * TOTAL_BUTTON_WIDTH - 30 * active_index, {
        duration: 100,
      });
      // withTiming(HORIZONTAL_SCROLL_START_BREAKPOINT * 1, {
      //   duration: 3000,
      // });
    } else if (index === active_index) {
      translatex = interpolate(
        translateY.value,
        [
          -1,
          0,
          TOTAL_CARD_HEIGHT * index,
          TOTAL_CARD_HEIGHT * (index + 1),
          TOTAL_CARD_HEIGHT * (index + 1) + 1,
        ],
        [
          0,
          0,
          (active_index - index) * TOTAL_BUTTON_WIDTH,
          active_index * TOTAL_BUTTON_WIDTH,
          3 * TOTAL_BUTTON_WIDTH,
        ],
        Extrapolate.CLAMP
      );
    } else {
    }

    if (index == 0) {
      console.log(
        `idx:${index},${active_index}=> Y: ${fixTwo(
          translateY.value
        )}, y: ${fixTwo(translatey)}, absY: ${absY}, cardHeight: ${fixTwo(
          cardHeight
        )}, diff: ${fixTwo(diff)}  `
      );
    }

    return {
      transform: [{ translateY: translatey }, { translateX: translatex }],
      height: cardHeight,
      width: widthScale * CARD_WIDTH,
      backgroundColor: index === active_index ? "pink" : "yellow",
    };
  });

  const iStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * (index + 1), TOTAL_CARD_HEIGHT * (index + 2)],
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
          marginTop: VERTICAL_SPACING,
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
