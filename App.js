import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import WelcomeStack from './src/navigation/welcomeStack';

export default function App() {
  return (
    <NavigationContainer>
      <WelcomeStack />
    </NavigationContainer>
  );
}
