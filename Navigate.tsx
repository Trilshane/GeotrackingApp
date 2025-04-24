import React from "react";
import HeadPage from "./pages/HeadPage";
import RouteListPage from "./pages/RouteListPage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="headPage">
        <Stack.Screen
          name="headPage"
          component={HeadPage}
          options={{ title: "Главная" }}
        />
        <Stack.Screen
          name="RouteList"
          component={RouteListPage}
          options={{ title: "Сохраненные маршруты" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
