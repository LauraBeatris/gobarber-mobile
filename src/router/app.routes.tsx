import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";

import { DASHBOARD_ROUTE } from "./routes";

const Stack = createStackNavigator();
const AppRouter: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName={DASHBOARD_ROUTE}
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: true,
        animationEnabled: true,
        cardStyle: {
          backgroundColor: theme.colors.gray,
        },
      }}
    >
      <Stack.Screen component={Dashboard} name={DASHBOARD_ROUTE} />
    </Stack.Navigator>
  );
};

export default AppRouter;
