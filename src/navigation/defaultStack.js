import React from 'react';
import Practice from 'screen/practice';
import Failed from 'screen/failed';
import Success from 'screen/success';
import WelcomeScreen from 'screen/welcome';
import Battle from 'screen/battle';
import ChooseTime from 'screen/chooseTime';
import SplashScreen from 'screen/splash';
import { SetLanguageScreen } from 'screen/settings/index';
import { StackRoute } from 'constants/route';
import SettingStack from './settingStack';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const DefaultStack = () => {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator
      initialRouteName={StackRoute.Main.Splash}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: false,
      })}>
      <Stack.Screen
        name={StackRoute.Main.Splash}
        component={SplashScreen}
        backBehavior="none"
      />
      <Stack.Screen
        name={StackRoute.Main.Welcome}
        component={WelcomeScreen}
        backBehavior="none"
      />
      <Stack.Screen name={StackRoute.Main.Practice} component={Practice} />
      <Stack.Screen name={StackRoute.Main.Failed} component={Failed} />
      <Stack.Screen name={StackRoute.Main.Battle} component={Battle} />
      <Stack.Screen name={StackRoute.Main.Success} component={Success} />
      <Stack.Screen name={StackRoute.Main.ChooseTime} component={ChooseTime} />

      <Stack.Screen name={StackRoute.Stack.Setting} component={SettingStack} />
    </Stack.Navigator>
  );
};

export default DefaultStack;
