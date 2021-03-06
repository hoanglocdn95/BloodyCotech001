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
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const SettingStack = () => {
  const config = {
    ...TransitionSpecs.TransitionIOSSpec,
    animation: 'spring',
    config: {
      stiffness: 600,
      damping: 200,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator
      initialRouteName={StackRoute.Main.Splash}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen
        name={StackRoute.BottomTabs.Setting}
        component={SetLanguageScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
