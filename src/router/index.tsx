import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components'
import  { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from './routes';

const Stack = createStackNavigator()

const Router: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName={SIGN_IN_ROUTE}
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
      <Stack.Screen name={SIGN_IN_ROUTE} component={SignIn} />
      <Stack.Screen name={SIGN_UP_ROUTE} component={SignUp} />
    </Stack.Navigator>
  )
}

export default Router;
