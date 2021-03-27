import React from 'react';
import Practice from 'screen/practice';
import Failed from 'screen/failed';
import Success from 'screen/success';
import Battle from 'screen/battle';
import ChooseTime from 'screen/chooseTime';
import SelectMode from 'screen/selectMode';
import { StackRoute } from 'constants/route';
import BottomStack from './bottomStack';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const DefaultStack = () => {
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
      initialRouteName={StackRoute.Stack.Bottom}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen name={StackRoute.Stack.Bottom} component={BottomStack} />
      <Stack.Screen name={StackRoute.Main.SelectMode} component={SelectMode} />
      <Stack.Screen name={StackRoute.Main.Practice} component={Practice} />
      <Stack.Screen name={StackRoute.Main.Failed} component={Failed} />
      <Stack.Screen name={StackRoute.Main.Battle} component={Battle} />
      <Stack.Screen name={StackRoute.Main.Success} component={Success} />
      <Stack.Screen name={StackRoute.Main.ChooseTime} component={ChooseTime} />
    </Stack.Navigator>
  );
};

export default DefaultStack;
