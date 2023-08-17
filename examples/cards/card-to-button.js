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
const VERTICAL_SPACING = 10;
const FINAL_HEIGHT = CARD_HEIGHT / 2;

const fixTwo = (num) => {
  "worklet";
  return num.toFixed(2);
};

export const Card = ({ title, text, translateY, index }) => {
  const rStyle = useAnimatedStyle(() => {
    const active_index = parseInt(
      translateY.value / (CARD_HEIGHT + VERTICAL_SPACING)
    );

    const absY = fixTwo(translateY.value % (CARD_HEIGHT + VERTICAL_SPACING));

    const widthScale = interpolate(
      translateY.value,
      [
        -1,
        0,
        (CARD_HEIGHT + VERTICAL_SPACING) * index,
        (CARD_HEIGHT + VERTICAL_SPACING) * (index + 1),
      ],
      [1, 1, 1, 0.2],
      Extrapolate.CLAMP
    );

    const translatex = interpolate(
      translateY.value,
      [
        -1,
        0,
        (CARD_HEIGHT + VERTICAL_SPACING) * index,
        CARD_HEIGHT * (index + 1),
      ],
      [0, 0, 0, index * (BUTTON_WIDTH + BUTTON_SPACING)],
      Extrapolate.CLAMP
    );

    const heightScale = interpolate(
      translateY.value,
      [
        -1,
        0,
        (CARD_HEIGHT + VERTICAL_SPACING) * index,
        (CARD_HEIGHT + VERTICAL_SPACING) * (index + 1),
      ],
      [1, 1, 1, 0.5],
      Extrapolate.CLAMP
    );

    let diff = interpolate(
      absY,
      [0, (CARD_HEIGHT + VERTICAL_SPACING) / 2, CARD_HEIGHT + VERTICAL_SPACING],
      [0, 0, FINAL_HEIGHT + VERTICAL_SPACING],
      Extrapolate.CLAMP
    );

    let translatey = translateY.value;
    if (index > active_index) {
      if (active_index > 0) {
        if (diff) {
          translatey -=
            (FINAL_HEIGHT+VERTICAL_SPACING) * (active_index - 1) +
            // VERTICAL_SPACING +
            diff 
            // -
            // active_index * VERTICAL_SPACING;
        } else {
          console.log(absY, (CARD_HEIGHT + VERTICAL_SPACING) / 2);
          if (absY < (CARD_HEIGHT + VERTICAL_SPACING) / 2) {
            translatey -=
              (FINAL_HEIGHT + VERTICAL_SPACING) * (active_index - 1); // - VERTICAL_SPACING; //+ 60 * (index-1);
          } else {
            translatey -=
              (FINAL_HEIGHT + VERTICAL_SPACING) * (active_index - 1);
          }
        }
      }
    } else if (index < active_index) {
      translatey -= (FINAL_HEIGHT + VERTICAL_SPACING) * index;
    } else {
      // index === active_index
      if (index > 0) {
        // console.log(
        //   translateY.value,
        //   index * (CARD_HEIGHT + VERTICAL_SPACING) +
        //     (CARD_HEIGHT + VERTICAL_SPACING) / 2
        // );
        if (
          translateY.value >
          index * (CARD_HEIGHT + VERTICAL_SPACING) +
            (CARD_HEIGHT + VERTICAL_SPACING) / 2
        ) {
          if (diff) {
            translatey -=
              (FINAL_HEIGHT + VERTICAL_SPACING) * (index - 1) + diff; //+ 60 * (index-1);
          } else {
            // console.log("=--=-=");
            translatey -= FINAL_HEIGHT * index - VERTICAL_SPACING; //+ 60 * (index-1);
          }
        } else {
          // console.log("active diff", diff);
          if (diff) {
            // translatey -= diff; //+ 60 * (index-1);
          } else {
            translatey -= (FINAL_HEIGHT + VERTICAL_SPACING) * (index - 1); //+ 60 * (index-1);
          }
        }
      }
    }

    if (index == 2) {
      console.log(
        `idx:${index},${active_index}=> Y: ${fixTwo(
          translateY.value
        )}, y: ${fixTwo(translatey)}, absY: ${absY}, height: ${fixTwo(
          heightScale
        )}, diff: ${fixTwo(diff)}  `
      );
    }

    return {
      transform: [{ translateY: translatey }, { translateX: translatex }],
      height: heightScale * CARD_HEIGHT,
      width: widthScale * CARD_WIDTH,
      backgroundColor: index === active_index ? "pink" : "yellow",
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
