/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import Intro from "./animations/00-introduction-to-reanimated";
// import PanBasic from './animations/01-pan-gesture-handler-basics';
// import InterPolate from './animations/02-interpolate-with-scrollview';
// import InterPolateColor from './animations/03-interpolate-color';
// import {PinchAnimation} from './animations/04-pinch-gesture-handler-basics';
// import {CircularProgressBar} from './animations/05-circular-progress-bar';
// import {SwipeToDelete} from './animations/06-swipe-to-delete';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimatedCards } from "./examples/cards/animated-cards";
// import Wallet from './examples/wallet/wallet';

function App() {
  const isDarkMode = useColorScheme() === "dark";

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Intro /> */}
      {/* <PanBasic /> */}
      {/* <InterPolate/> */}
      {/* <InterPolateColor /> */}
      {/* <PinchAnimation /> */}
      <AnimatedCards />
      {/* <Wallet /> */}
      {/* <CircularProgressBar /> */}
      {/* <SwipeToDelete /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
