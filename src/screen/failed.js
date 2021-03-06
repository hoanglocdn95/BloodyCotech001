import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  colors,
  fonts,
  spaces,
  borderRadius,
  borderWidth,
} from 'constants/theme';
import WorkingSection from 'component/WorkingSection';

import { PlayIcon } from 'assets/icons/index';
import { StackRoute } from 'constants/route';
import AppID from 'constants/admob';
import PracticeStore from 'stores/practiceStore';
import LoadingStore from 'stores/loadingStore';
import rewardStore from 'stores/rewardStore';
import { useTranslation } from 'react-i18next';
import { TypeEquation } from 'constants/common';

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';

const adUnitId = TestIds.INTERSTITIAL;
// const adUnitId = AppID.interstitial.FAILED_SCREEN.id;

const interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function FailedScreen() {
  const { t } = useTranslation();
  const Navigate = useNavigation();
  const [isLoadAdMod, setLoadAdMob] = useState(false);

  useEffect(() => {
    LoadingStore.setLoadingIndicator(true);
    const eventListener = interstitialAd.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoadAdMob(true);
        LoadingStore.setLoadingIndicator(false);
      }
    });

    // Start loading the interstitialAd straight away
    interstitialAd.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  useEffect(() => {
    if (isLoadAdMod) {
      interstitialAd.show();
      LoadingStore.setLoadingIndicator(false);
    }
  }, [isLoadAdMod]);

  const renderWorkingSection = () => {
    switch (PracticeStore.Operator) {
      case TypeEquation.ADDITION:
        return (
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={
              PracticeStore.FirstParameter + PracticeStore.SecondParameter
            }
            operator={PracticeStore.Operator}
            isCorrect
          />
        );
      case TypeEquation.MULTIPLICATION:
        return (
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={
              PracticeStore.FirstParameter * PracticeStore.SecondParameter
            }
            operator={PracticeStore.Operator}
            isCorrect
          />
        );
      case TypeEquation.SUBTRACTION:
        return (
          <WorkingSection
            firstParameter={PracticeStore.CorrectResult}
            secondParameter={PracticeStore.SecondParameter}
            result={PracticeStore.ResultParameter}
            operator={PracticeStore.Operator}
            isCorrect
          />
        );
      case TypeEquation.DIVISION:
        return (
          <WorkingSection
            firstParameter={PracticeStore.CorrectResult}
            secondParameter={PracticeStore.SecondParameter}
            result={PracticeStore.ResultParameter}
            operator={PracticeStore.Operator}
            isCorrect
          />
        );
      default:
        return;
    }
  };

  const navigateToWelcome = () => {
    rewardStore.setMineCoin(1);
    Navigate.navigate(StackRoute.Main.Welcome);
  };

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
      {renderWorkingSection()}
      <View style={styles.pointContainer}>
        <Text style={styles.pointText}>{t('failed.point')}</Text>
        <Text style={styles.pointText}>{PracticeStore.Point}</Text>
      </View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => navigateToWelcome()}>
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
  expressionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.space4,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    color: colors.white_milk,
    fontSize: fonts.header2,
    fontWeight: 'bold',
  },
  questionMark: {
    color: 'white',
    fontSize: fonts.header6 + fonts.largest,
    marginLeft: spaces.space4,
    fontWeight: 'bold',
    transform: [
      {
        rotate: '8deg',
      },
    ],
  },
  pointContainer: {
    backgroundColor: colors.bg_primary,
    borderRadius: borderRadius.header,
    borderWidth: borderWidth.bolder,
    borderColor: colors.white,
    marginBottom: spaces.space8,
    flexDirection: 'row',
    paddingHorizontal: spaces.space6,
    paddingVertical: spaces.space2,
  },
  pointText: {
    fontSize: fonts.header2,
    fontWeight: 'bold',
    color: colors.text,
  },
  imageContainer: {
    minWidth: spaces.imageContainer,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
  },
});
