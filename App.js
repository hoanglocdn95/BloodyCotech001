import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/i18n/index';
// import { useTranslation } from 'react-i18next';

import DefaultStack from './src/navigation/defaultStack';
const initI18n = i18n;

export default function App() {
  return (
    <NavigationContainer>
      <DefaultStack />
    </NavigationContainer>
  );
}
