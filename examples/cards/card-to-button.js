import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import { SIZES } from "./constants";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// console.log(HEIGHT);
const CARD_HEIGHT = 180;
const CARD_WIDTH = 350;
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

export const Card = ({
  title,
  text,
  translateY,
  index,
  scrollToItemByIndex,
}) => {
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
    let translatex = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [0, 0, 0, index * TOTAL_BUTTON_WIDTH],
      Extrapolate.CLAMP
    );

    const xDiff = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
      [0, 0, 0, index * TOTAL_BUTTON_WIDTH],
      Extrapolate.CLAMP
    );

    // if (index < active_index) {
    //   translatex = index * TOTAL_BUTTON_WIDTH - 30 * active_index;
    //   // withTiming(HORIZONTAL_SCROLL_START_BREAKPOINT * 1, {
    //   //   duration: 3000,
    //   // });
    // } else if (index === active_index) {
    //   translatex = interpolate(
    //     translateY.value,
    //     [
    //       -1,
    //       0,
    //       TOTAL_CARD_HEIGHT * index,
    //       TOTAL_CARD_HEIGHT * (index + 1),
    //       TOTAL_CARD_HEIGHT * (index + 1) + 1,
    //     ],
    //     [
    //       0,
    //       0,
    //       (active_index - index) * TOTAL_BUTTON_WIDTH,
    //       active_index * TOTAL_BUTTON_WIDTH,
    //       3 * TOTAL_BUTTON_WIDTH,
    //     ],
    //     Extrapolate.CLAMP
    //   );
    // } else {
    // }

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
      opacity: index < active_index ? 0 : 1,
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
      // opacity,
    };
  });

  const tStyle = useAnimatedStyle(() => {
    const cardHeight = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, TOTAL_CARD_HEIGHT * (index + 1)],
      [CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT, FINAL_HEIGHT],
      Extrapolate.CLAMP
    );
    const fontSize = interpolate(
      cardHeight,
      [CARD_HEIGHT, FINAL_HEIGHT],
      [SIZES.INITIAL_TITLE_FONT_SIZE, SIZES.FINAL_TITLE_FONT_SIZE],
      Extrapolate.CLAMP
    );
    const marginVertical = interpolate(
      cardHeight,
      [CARD_HEIGHT, FINAL_HEIGHT],
      [30, 5],
      Extrapolate.CLAMP
    );
    return {
      fontSize,
      marginVertical,
    };
  });

  const lStyle = useAnimatedStyle(() => {
    const cardHeight = interpolate(
      translateY.value,
      [-1, 0, TOTAL_CARD_HEIGHT * index, TOTAL_CARD_HEIGHT * (index + 1)],
      [CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT, FINAL_HEIGHT],
      Extrapolate.CLAMP
    );
    const fontScale = interpolate(
      cardHeight,
      [CARD_HEIGHT, FINAL_HEIGHT],
      [1, 0],
      Extrapolate.CLAMP
    );
    // console.log(fontScale, cardHeight);
    return {
      fontSize: fontScale * 14,
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
          // marginHorizontal: 10 * SPACING,
          marginTop: VERTICAL_SPACING,
          justifyContent: "center",
        },
        rStyle,
      ]}
    >
      <View style={{}}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            scrollToItemByIndex({
              y: (CARD_HEIGHT + VERTICAL_SPACING) * index,
              x: 0,
            });
          }}
        >
          <Animated.Text style={[styles.text, tStyle]}>{title}</Animated.Text>
        </TouchableOpacity>
        <Animated.View style={iStyle}>
          <Animated.Text style={lStyle}>{text}</Animated.Text>
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
