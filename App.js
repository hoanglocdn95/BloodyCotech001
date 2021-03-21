import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/i18n/index';
import DefaultStack from './src/navigation/defaultStack';
import { ReqConfigAdmob } from './src/services/index';
// import LoadingIndicator from './src/component/LoadingIndicator';

const _initI18n = i18n;

export default function App() {
  React.useEffect(() => {
    ReqConfigAdmob();
  }, []);

  return (
    <>
      <NavigationContainer>
        <DefaultStack />
      </NavigationContainer>
    </>
  );
}
