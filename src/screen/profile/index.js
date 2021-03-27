import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';

import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';
import { LanguageList } from 'constants/common';
import { PlayIcon } from 'assets/icons/index';
import Checkbox from 'component/Form/Checkbox';
import { useTranslation } from 'react-i18next';
import { getData } from 'utils/sensitiveInfo';
import { MineCoinKey } from 'constants/common';
import AppID from 'constants/admob';

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

  // useEffect(() => {
  //   const value = getData(MineCoinKey);
  //   console.log('useEffect ~ value', value);
  // }, []);
  useEffect(() => {
    const eventListener = rewardedAd.onAdEvent((type, error, reward) => {
      console.log('file: index.js ~ line 48 ~ eventListener ~ type', type);
      switch (type) {
        case RewardedAdEventType.LOADED:
          console.log('file: LOADED ~ reward', reward);
          setLoadAdMob(true);
          break;
        case RewardedAdEventType.EARNED_REWARD:
          console.log('file: EARNED_REWARD ~ reward', reward);
          break;
        default:
          break;
      }
    });

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
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
      <Text style={styles.styleTitle}> {t('settings.profile.title')}</Text>
      <Button
        disabled={!isLoadAdMod}
        onPress={() => showReward()}
        title="Test Reward"
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
});
