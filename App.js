import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/i18n/index';
import BottomStack from './src/navigation/bottomStack';
import { ReqConfigAdmob } from './src/services/index';

const _initI18n = i18n;

export default function App() {
  React.useEffect(() => {
    ReqConfigAdmob();
  }, []);

  return (
    <NavigationContainer>
      <BottomStack />
    </NavigationContainer>
  );
}
