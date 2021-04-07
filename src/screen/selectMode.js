import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { TypeEquation } from 'constants/common';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';
import { BattleIcon, PracticeIcon } from 'assets/icons/index';
import { useTranslation } from 'react-i18next';
import PracticeStore from 'stores/practiceStore';
import rewardStore from 'stores/rewardStore';

const SelectModeScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();
  const {
    IsSubtractAvailable,
    IsMultiAvailable,
    IsDivideAvailable,
  } = rewardStore;
  const chooseOperator = [
    {
      type: TypeEquation.ADDITION,
      description: t('operator.addition'),
    },
    {
      type: IsSubtractAvailable ? TypeEquation.SUBTRACTION : '',
      description: t('operator.subtraction'),
    },
    {
      type: IsMultiAvailable ? TypeEquation.MULTIPLICATION : '',
      description: t('operator.multiplication'),
    },
    {
      type: IsDivideAvailable ? TypeEquation.DIVISION : '',
      description: t('operator.division'),
    },
  ];

  const renderListCheckbox = () => {
    return chooseOperator.map((item, index) => {
      if (item.type === '') {
        return null;
      }
      return (
        <TouchableHighlight
          key={`${item.type}_${index}`}
          style={styles.buttonCalculation}
          onPress={() => PracticeStore.setOperator(item.type)}>
          <Text
            style={[
              styles.buttonText,
              PracticeStore.Operator === item.type ? styles.textActive : {},
            ]}>
            {item.description}
          </Text>
        </TouchableHighlight>
      );
    });
  };

  return (
    <View style={styles.container}>
      {IsSubtractAvailable || IsMultiAvailable || IsDivideAvailable ? (
        <>
          <Text style={styles.styleTitle}>
            {t('selectMode.chooseOperator')}
          </Text>
          <View style={styles.containerList}>{renderListCheckbox()}</View>
        </>
      ) : null}

      <Text style={styles.styleTitle}>{t('selectMode.chooseMode')}</Text>
      <View style={styles.containerButton}>
        <TouchableHighlight
          onPress={() => Navigate.navigate(StackRoute.Main.ChooseTime)}>
          <View style={styles.buttonContainer}>
            <Image style={styles.icon} source={PracticeIcon} />
            <Text style={styles.styleTitle}>{t('selectMode.practice')}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => Navigate.navigate(StackRoute.Main.Battle)}>
          <View style={styles.buttonContainer}>
            <Image style={styles.icon} source={BattleIcon} />
            <Text style={styles.styleTitle}>{t('selectMode.battle')}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
});

export default SelectModeScreen;

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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButton: {
    marginTop: spaces.space5,
  },
  buttonContainer: {
    minWidth: spaces.imageContainer,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
    padding: spaces.space0,
  },
  icon: {
    width: spaces.imageIcon,
    height: spaces.imageIcon,
  },
  containerList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spaces.space1,
    marginBottom: spaces.space2,
  },
  buttonCalculation: {
    width: spaces.buttonOperator,
    marginTop: spaces.space2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
  },
  buttonText: {
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
  textActive: {
    backgroundColor: colors.bg_secondary,
    color: colors.white,
  },
});
