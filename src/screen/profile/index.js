import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AppID from 'constants/admob';
import rewardStore from 'stores/rewardStore';
import CountDown from 'react-native-countdown-component';

import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';

const adRewardId = TestIds.REWARDED;
// const adRewardId = AppID.interstitial.REWARD_1.id;

const rewardedAd = RewardedAd.createForAdRequest(adRewardId, {
  requestNonPersonalizedAdsOnly: true,
});

const ProfileScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();
  const [isLoadAdMod, setLoadAdMob] = useState(false);

  useEffect(() => {
    const eventListener = rewardedAd.onAdEvent((type, error, reward) => {
      switch (type) {
        case RewardedAdEventType.LOADED:
          setLoadAdMob(true);
          break;
        case RewardedAdEventType.EARNED_REWARD:
          rewardStore.setMineCoin(reward.amount);
          break;
        default:
          break;
      }
    });

    rewardedAd.load();
    return () => {
      eventListener();
    };
  }, [isLoadAdMod]);

  const showReward = () => {
    rewardedAd.show();
    setLoadAdMob(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>{t('settings.profile.title')}</Text>
      <Text style={styles.description}>
        {' '}
        {t('settings.profile.suggestSaveCoin')}
      </Text>
      <Button
        style={styles.buttonSaveCoin}
        disabled={!isLoadAdMod}
        onPress={() => showReward()}
        title={t('settings.profile.saveCoinButton')}
      />
      <CountDown
        id={'aa'}
        until={30}
        // onFinish={() => navigateToFailed()}
        size={spaces.space4}
        timeToShow={['S']}
        timeLabels={{ s: '' }}
        // digitStyle={styles.digitStyle}
        // digitTxtStyle={styles.digitTextStyle}
        // running={!isShowModal}
      />
    </View>
  );
});

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bg_primary,
    paddingTop: '20%',
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
    fontSize: fonts.larger,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    color: colors.white,
    fontSize: fonts.normal,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: spaces.space2,
  },
  buttonSaveCoin: {
    borderRadius: borderRadius.medium,
    padding: spaces.space2,
  },
});
