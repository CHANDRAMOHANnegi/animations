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

export const Button = (props) => {
  const { title, text, translateY, index, scrollToItemByIndex } = props;
  //   console.log('===-=',props);
  const iStyle = useAnimatedStyle(() => {
    const show = translateY.value >= TOTAL_CARD_HEIGHT * (index + 1);
    return {
      opacity: show ? 1 : 0,
    };
  });
  return (
    <>
      <Animated.View
        style={[
          {
            alignItems: "center",
            backgroundColor: "transparent",
            height: 60,
            width: 60,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "red",
            marginRight: BUTTON_SPACING,
            marginTop: 10,
          },
          iStyle,
        ]}
      >
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            scrollToItemByIndex({
              y: (CARD_HEIGHT + VERTICAL_SPACING) * index,
              x: 0,
            });
          }}
        >
          <Text>{title}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    // marginVertical: 30,
    backgroundColor: "red",
    // alignItems: "center",
    // textAlign: "center",
  },
});
