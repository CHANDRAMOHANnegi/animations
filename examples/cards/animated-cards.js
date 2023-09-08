import React from "react";
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
const data = [
  {
    title: "Applications",
    text: "10% increase in application traffic traffic traffic",
  },
  {
    title: "traffic",
    text: "100% decrease in application traffic traffic traffic",
  },
  {
    title: "security",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "network",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "ssl",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience2",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience3",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience4",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience5",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience6",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience7",
    text: "Your current organization risk score is critical ",
  },
  {
    title: "experience8",
    text: "Your current organization risk score is critical ",
  },
];

export const AnimatedCards = () => {
  const [cardsData, setCardsData] = React.useState(data);
  const scrollViewRef = React.useRef(null);

  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const handleUpdateCardsData = () => {
    const randomInt = 2;

    const newItem = {
      title: "randomInt" + randomInt,
      text: "10% increase in application traffic traffic traffic",
    };

    const newData = [...cardsData];
    newData.splice(randomInt, 0, newItem);
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
        <Text style={{ color: "white" }}>Interactive Business Insights</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleUpdateCardsData();
        }}
        style={{
          backgroundColor: "green",
        }}
      >
        <Text style={{ color: "red" }}>Buttons :</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "yellow",
          flex: 1,
          position: "relative",
          alignItems: "center",
        }}
      >
        <Animated.ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          // StickyHeaderComponent={p => {
          //   return (
          //     <View {...p} style={{backgroundColor: 'red'}}>
          //       <Text>Hello</Text>
          //       <Text>Hello</Text>
          //       <Text>Hello</Text>
          //       <Text>Hello</Text>
          //     </View>
          //   );
          // }}
          // style={{backgroundColor: 'pink'}}
          // contentInset={{top: 50}}
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

export default AnimatedCards;
