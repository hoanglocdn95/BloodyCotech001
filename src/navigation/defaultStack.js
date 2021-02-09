import React from 'react';
import Practice from '../screen/practice';
import Failed from '../screen/failed';
import Success from '../screen/success';
import WelcomeScreen from '../screen/welcome';
import Battle from '../screen/battle';
import ChooseTime from '../screen/chooseTime';
import SplashScreen from '../screen/splash';
import { StackRoute } from '../constants/route';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName={StackRoute.Main.Splash}>
      <Stack.Screen
        name={StackRoute.Main.Splash}
        component={SplashScreen}
        options={{ headerShown: false }}
        backBehavior="none"
      />
      <Stack.Screen
        name={StackRoute.Main.Welcome}
        component={WelcomeScreen}
        options={{ headerShown: false }}
        backBehavior="none"
      />
      <Stack.Screen
        name={StackRoute.Main.Practice}
        component={Practice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={StackRoute.Main.Failed}
        component={Failed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={StackRoute.Main.Battle}
        component={Battle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={StackRoute.Main.Success}
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={StackRoute.Main.ChooseTime}
        component={ChooseTime}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DefaultStack;
