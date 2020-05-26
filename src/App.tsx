import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components'

import Routes from './router';
import theme from './styles/theme'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#312e38"
          />
          <Routes />
        </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
