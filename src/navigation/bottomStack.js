import React from 'react';

import { SetLanguageScreen } from 'screen/settings/index';
import ProfileScreen from 'screen/profile/index';
import { StackRoute } from 'constants/route';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import DefaultStack from 'navigation/defaultStack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
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
    <Tab.Navigator initialRouteName={StackRoute.BottomTabs.Default}>
      <Tab.Screen
        name={StackRoute.BottomTabs.Setting}
        component={SetLanguageScreen}
      />
      <Tab.Screen
        name={StackRoute.BottomTabs.Default}
        component={DefaultStack}
      />
      <Tab.Screen
        name={StackRoute.BottomTabs.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
