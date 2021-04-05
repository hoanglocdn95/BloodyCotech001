/* eslint-disable no-extra-boolean-cast */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { useTranslation } from 'react-i18next';
import AppID from 'constants/admob';
import rewardStore from 'stores/rewardStore';

import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import DeviceInfo from 'react-native-device-info';

const adRewardId = TestIds.REWARDED;
// const adRewardId = AppID.interstitial.REWARD_1.id;

const rewardedAd = RewardedAd.createForAdRequest(adRewardId, {
  requestNonPersonalizedAdsOnly: true,
  testDevices: [DeviceInfo.getDeviceId()],
});

const ProfileScreen = observer(() => {
  const { t } = useTranslation();
  const [isLoadAdMod, setLoadAdMob] = useState(false);

  useEffect(() => {
    const eventListener = rewardedAd.onAdEvent((type, error, reward) => {
      switch (type) {
        case RewardedAdEventType.LOADED:
          setLoadAdMob(true);
          break;
        case RewardedAdEventType.EARNED_REWARD:
          rewardStore.setMineCoin(1);
          rewardStore.getTimeToRewardLocalStorage();
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
    if (rewardedAd.show) {
      rewardedAd.show();
      setLoadAdMob(false);
      rewardStore.setTimeToReward();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>{t('settings.profile.title')}</Text>
      <Text style={styles.description}>
        {t('settings.profile.suggestSaveCoin')}
      </Text>
      <Button
        style={styles.buttonSaveCoin}
        disabled={!isLoadAdMod}
        onPress={() => showReward()}
        title={t('settings.profile.saveCoinButton')}
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
    height: spaces.space7,
  },
});
