import * as React from 'react';
import { observer } from 'mobx-react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HomeIcon, ResetIcon } from 'assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import { spaces, widthComponent, fonts } from 'constants/theme';
import { StackRoute } from 'constants/route';
import { useTranslation } from 'react-i18next';
import rewardStore from 'stores/rewardStore';
import PopupStore from 'stores/popupStore';
import { TypePopup } from 'constants/common';

const PointSection = props => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  const goBackHome = () => {
    if (props.handleGoBack) {
      props.handleGoBack();
    }
    Navigate.navigate(StackRoute.Main.Welcome);
  };

  const handleButtonReset = () => {
    if (rewardStore.MineCoin === 0) {
      PopupStore.togglePopup(true, {
        type: TypePopup.NOTICE,
        content: t('component.pointSection.resetOut'),
      });
    } else {
      rewardStore.setMineCoin(-1);
      props.handleReset();
    }
  };

  const renderResetButton = () => {
    if (!props.handleReset) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={
          rewardStore.MineCoin === 0 ? () => {} : () => handleButtonReset()
        }
        style={styles.reset}>
        <Image source={ResetIcon} style={[styles.icon, styles.resetIcon]} />
        <Text style={styles.resetTime}>
          {rewardStore.MineCoin > 99 ? 99 : rewardStore.MineCoin}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointContainer}>
        {props.isShowHomeButton && (
          <TouchableOpacity onPress={goBackHome}>
            <Image source={HomeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.point}>
          {props.point} {t('component.pointSection.point')}
        </Text>
        {renderResetButton()}
      </View>
    </View>
  );
};

export default observer(PointSection);

const styles = StyleSheet.create({
  container: {
    paddingTop: spaces.space4,
    width: '100%',
    alignItems: 'center',
  },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spaces.space4,
  },
  icon: {
    marginTop: spaces.space0,
    width: widthComponent.iconHeader,
    height: widthComponent.iconHeader,
  },
  point: {
    color: '#fff',
    fontSize: fonts.header2,
    fontWeight: 'bold',
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  resetTime: {
    fontSize: widthComponent.iconHeader / 2.5,
    color: '#fff',
    fontWeight: 'bold',
    width: widthComponent.iconHeader / 2,
    textAlign: 'center',
  },
  resetIcon: {
    position: 'absolute',
  },
});
