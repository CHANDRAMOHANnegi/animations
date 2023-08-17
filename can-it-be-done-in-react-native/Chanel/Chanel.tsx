import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Item, { MAX_HEIGHT } from "./Item";
import { items } from "./Model";

const styles = StyleSheet.create({
  container: {
    height: items.length * MAX_HEIGHT,
    backgroundColor: "black",
  },
});

const Channel = () => {
  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} index={index} />
          ))}
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Channel;
