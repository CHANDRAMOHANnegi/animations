import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  interpolate,
  Extrapolate,
  withDelay,
  useAnimatedScrollHandler,
  useDerivedValue,
} from "react-native-reanimated";
import { Card } from "./card-to-button";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
// console.log(HEIGHT);
const ITEM_SIZE = 120;
const SPACING = 5;
const VERTICAL_SPACING = 5;

import { data1, data2 } from "./data";
import { Button } from "./buttons";

export const CardToButtonAnimation = () => {
  const [cardsData, setCardsData] = React.useState(data1);
  const scrollViewRef = React.useRef(null);

  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const handleUpdateCardsData = () => {
    const randomInt = parseInt(Math.random() * 10);

    const newItem = {
      title: "randomInt" + randomInt,
      text: "10% increase in application traffic traffic traffic",
    };

    const newData = [...cardsData];
    newData.splice(2, 0, newItem);
    // console.log(cardsData, newData);
    setCardsData(newData);
  };

  const scrollToItemByIndex = ({ x, y }) => {
    console.log({ x, y });
    scrollViewRef.current.scrollTo({
      x,
      y,
    });
  };
  const [time, setTime] = useState(0);

  useEffect(() => {
    // setInterval(() => {
    //   setTime((t) => t + 1);
    // }, 1000);
  }, []);

  useEffect(() => {
    if (time === 5) {
      // setCardsData(data2);
    }
    // if (time % 5 === 0) {
    //   handleUpdateCardsData();
    // }
  }, [time]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "blue",
          alignItems: "center",
          paddingVertical: VERTICAL_SPACING,
          position: "relative",
        }}
      >
        <Text style={{ color: "white" }}>
          Interactive Business Insights {time}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "yellow",
          flex: 1,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View
          onPress={() => {
            handleUpdateCardsData();
          }}
          style={{
            // backgroundColor: "transparent",
            position: "absolute",
            zIndex: 1,
            // top: 20
          }}
        >
          <Animated.ScrollView
            ref={scrollViewRef}
            scrollEventThrottle={16}
            // onScroll={scrollHandler}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            horizontal={true}
            // contentInset={{left:20}}
            showsHorizontalScrollIndicator={false}
          >
            {cardsData.map((d, index) => {
              console.log("=-=-=-=-", d);
              return (
                <Button
                  {...d}
                  translateY={translateY}
                  index={index}
                  key={index}
                />
              );
            })}
          </Animated.ScrollView>
        </View>
        <Animated.ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
        >
          {cardsData.map((d, index) => (
            <Card
              {...d}
              translateY={translateY}
              scrollToItemByIndex={scrollToItemByIndex}
              index={index}
              key={index}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 30,
    backgroundColor: "red",
  },
});

export default CardToButtonAnimation;
