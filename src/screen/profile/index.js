/* eslint-disable no-extra-boolean-cast */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import { CoinsWhite } from 'assets/icons/index';
import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { useTranslation } from 'react-i18next';
import AppID from 'constants/admob';
import rewardStore from 'stores/rewardStore';
import PopupStore from 'stores/popupStore';

import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import DeviceInfo from 'react-native-device-info';
import { CalculationKey } from 'constants/common';
import { TypePopup } from 'constants/common';

// const adRewardId = TestIds.REWARDED;
const adRewardId = AppID.interstitial.REWARD_1.id;

const rewardedAd = RewardedAd.createForAdRequest(adRewardId, {
  requestNonPersonalizedAdsOnly: true,
  testDevices: [DeviceInfo.getDeviceId()],
});

const ProfileScreen = observer(() => {
  const { t } = useTranslation();
  const [isLoadAdMod, setLoadAdMob] = useState(false);
  const {
    IsSubtractAvailable,
    IsMultiAvailable,
    IsDivideAvailable,
  } = rewardStore;
  const modeList = [
    {
      isUnlock: IsSubtractAvailable,
      label: t('operator.subtraction'),
      keyName: CalculationKey.SUBTRACTION,
      price: 50,
    },
    {
      isUnlock: IsMultiAvailable,
      label: t('operator.multiplication'),
      keyName: CalculationKey.MULTIPLICATION,
      price: 100,
    },
    {
      isUnlock: IsDivideAvailable,
      label: t('operator.division'),
      keyName: CalculationKey.DIVISION,
      price: 100,
    },
  ];

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

  const handleUnlockMode = (mode, price) => {
    if (rewardStore.MineCoin >= price) {
      rewardStore.unlockMode(mode);
    } else {
      PopupStore.togglePopup(true, {
        type: TypePopup.NOTICE,
        content: t('component.pointSection.resetOut'),
      });
    }
  };

  const renderUnlockMode = () => {
    return modeList.map((item, index) => {
      if (item.isUnlock) {
        return null;
      }
      return (
        <TouchableOpacity
          key={`${item.type}_${index}`}
          style={styles.buttonCalculation}
          onPress={() => handleUnlockMode(item.keyName, item.price)}>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>{t('settings.profile.title')}</Text>
      <View style={styles.containerCoins}>
        <Text style={styles.textCoins}>
          {t('settings.profile.amountCoins')}
        </Text>
        <Text style={styles.textCoins}>{rewardStore.MineCoin}</Text>
        <Image source={CoinsWhite} style={styles.imgCoins} />
      </View>
      <Text style={styles.description}>
        {t('settings.profile.suggestSaveCoin')}
      </Text>
      <Button
        style={styles.buttonSaveCoin}
        disabled={!isLoadAdMod}
        onPress={() => showReward()}
        title={t('settings.profile.saveCoinButton')}
      />
      {renderUnlockMode()}
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
  containerCoins: {
    flexDirection: 'row',
    borderRadius: borderRadius.medium,
    paddingVertical: spaces.space0,
    paddingHorizontal: spaces.space3,
    borderWidth: spaces.space0,
    borderColor: colors.white,
    marginTop: spaces.space1,
  },
  textCoins: {
    fontSize: fonts.larger,
    color: colors.white,
    fontWeight: 'bold',
  },
  imgCoins: {
    marginLeft: spaces.space0,
    height: spaces.space6,
    width: spaces.space6,
  },
  buttonCalculation: {
    width: spaces.buttonOperator,
    marginTop: spaces.space2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
  },
  label: {
    textTransform: 'uppercase',
    color: colors.text,
    fontSize: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'nowrap',
    paddingVertical: spaces.space1,
    paddingHorizontal: spaces.space3,
    borderRadius: borderRadius.header,
  },
});
