import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";
import CreateAppointment from "../pages/CreateAppointment";
import CreateAppointmentSuccess from "../pages/CreateAppointmentSuccess";
import Profile from "../pages/Profile";
import {
  DASHBOARD_ROUTE,
  PROFILE_ROUTE,
  CREATE_APPOINTMENT_ROUTE,
  CREATE_APPOINTMENT_SUCCESS_ROUTE,
} from "./routes";

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
      <Stack.Screen
        component={CreateAppointment}
        name={CREATE_APPOINTMENT_ROUTE}
      />
      <Stack.Screen
        component={CreateAppointmentSuccess}
        name={CREATE_APPOINTMENT_SUCCESS_ROUTE}
      />

      <Stack.Screen component={Profile} name={PROFILE_ROUTE} />
    </Stack.Navigator>
  );
};

export default AppRouter;
