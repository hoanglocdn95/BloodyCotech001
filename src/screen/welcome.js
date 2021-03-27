import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

import {
  colors,
  fonts,
  spaces,
  borderRadius,
  borderWidth,
} from 'constants/theme';

import PracticeStore from 'stores/practiceStore';
import CounterStore from 'stores/counterStore';
import { PlayIcon } from 'assets/icons/index';
import { StackRoute } from 'constants/route';
import WorkingSection from 'component/WorkingSection';
import { AnimationRocket } from 'assets/animations/index';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      this.animation.play();
      PracticeStore.reset();
      CounterStore.reset();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.styleTitle, styles.title1]}>
          {t('welcome.title1')}
        </Text>
        <Text style={[styles.styleTitle, styles.title2]}>
          {t('welcome.title2')}
        </Text>
      </View>
      <WorkingSection firstParameter={1} secondParameter={1} result={3} />
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        style={styles.styleAnimation}
        loop={true}
        source={AnimationRocket}
      />
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.SelectMode)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.normal,
    borderColor: 'transparent',
    paddingHorizontal: spaces.space3,
    borderRadius: borderRadius.header,
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
  },
  title1: {
    fontSize: fonts.header1,
    marginRight: spaces.space2,
  },
  title2: {
    fontSize: fonts.header4,
    fontWeight: 'bold',
  },
  selectText: {
    fontWeight: 'bold',
    fontSize: fonts.large,
    padding: spaces.space4,
  },
  imageContainer: {
    minWidth: spaces.imageContainer,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
  },
  styleAnimation: {
    width: spaces.imageAnimation,
    height: spaces.imageAnimation,
    marginBottom: spaces.space5,
  },
});
