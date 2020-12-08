import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import Routes from "./router";
import theme from "./styles/theme";
import AuthContainer from "./contexts/auth/AuthContainer";

const App: React.FC = () => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      <AuthContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <Routes />
      </AuthContainer>
    </ThemeProvider>
  </NavigationContainer>
);

export default App;
