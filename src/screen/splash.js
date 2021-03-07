import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spaces } from 'constants/theme';
import { StackRoute } from 'constants/route';
import { LogoBrand } from 'assets/icons/index';
import { ReqConfigAdmob } from 'services/index';

export default function SplashScreen() {
  const Navigate = useNavigation();

  useEffect(() => {
    ReqConfigAdmob();
    setTimeout(() => Navigate.navigate(StackRoute.Main.Welcome), 3000);
  });

  return (
    <View style={styles.container}>
      <Image source={LogoBrand} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: spaces.imageBrand,
    width: spaces.imageBrand,
  },
});
