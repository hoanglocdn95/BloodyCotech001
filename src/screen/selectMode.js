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
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';
import { BattleIcon, PracticeIcon } from 'assets/icons/index';
import { useTranslation } from 'react-i18next';

const SelectModeScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  return (
    <View style={styles.container}>
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
});
