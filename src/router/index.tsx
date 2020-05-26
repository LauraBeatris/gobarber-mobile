import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components'
import  { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Stack = createStackNavigator()

const Router: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: true,
        animationEnabled: true,
        gestureEnabled: true,
        cardStyle: {
          backgroundColor: theme.colors.dark
        }
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default Router;
