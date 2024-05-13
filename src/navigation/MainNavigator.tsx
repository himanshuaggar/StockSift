import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SheetProvider } from "react-native-actions-sheet";
import { mergedStacks } from "./ScreenCollections";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <SheetProvider>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
        initialRouteName="AuthVerificationScreen"
      >
        {mergedStacks.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </SheetProvider>
  );
};

export default MainNavigator;