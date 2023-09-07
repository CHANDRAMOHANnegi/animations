import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./screens/posts";
import Screen2 from "./screens/detail";
import Home from "./home";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerScreen from "./examples/drawer/drawer-screen";
// import { Home } from "./examples/drawer/drawer";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // presentation: "transparentModal",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Posts"
            component={Screen1}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="Detail" component={Screen2} />
          <Stack.Screen name="Drawer1" component={DrawerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
