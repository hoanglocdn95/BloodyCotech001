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
import TabBottom from 'component/TabBottom';
import WelcomeScreen from 'screen/welcome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={StackRoute.Main.Welcome}
      tabBar={props => <TabBottom {...props} />}>
      <Tab.Screen
        name={StackRoute.BottomTabs.Setting}
        component={SetLanguageScreen}
      />
      <Tab.Screen name={StackRoute.Main.Welcome} component={WelcomeScreen} />
      <Tab.Screen
        name={StackRoute.BottomTabs.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
