import React, { useState } from 'react';
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

import { PlayIcon } from 'assets/icons/index';
import { StackRoute } from 'constants/route';
import BattleStore from 'stores/battleStore';
import { useTranslation } from 'react-i18next';

export default function SuccessScreen() {
  const { t } = useTranslation();
  const [isShowOption, setIsShowOption] = useState(false);

  const Navigate = useNavigation();

  const handleReStart = route => {
    BattleStore.setPoint(0, 1);
    BattleStore.setPoint(0, 2);
    BattleStore.setFirstParameter(BattleStore.randomNumber(1, 9));
    BattleStore.setSecondParameter(BattleStore.randomNumber(1, 9));
    Navigate.navigate(route);
  };
  const chooseColor = () => {
    return BattleStore.player1.point > BattleStore.player2.point
      ? { color: 'green' }
      : { color: 'red' };
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.styleTitle, styles.title1]}>
          {t('success.winner')}
        </Text>
        <Text style={[styles.styleTitle, styles.title2, chooseColor()]}>
          {t('success.player')}{' '}
          {BattleStore.player1.point > BattleStore.player2.point ? 1 : 2}
        </Text>
      </View>
      {isShowOption ? (
        <View>
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => handleReStart(StackRoute.Main.Practice)}>
            <Text style={[styles.styleTitle, styles.selectText]}>
              {t('welcome.practice')}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => handleReStart(StackRoute.Main.Battle)}>
            <Text style={[styles.styleTitle, styles.selectText]}>
              {t('welcome.battle')}
            </Text>
          </TouchableHighlight>
        </View>
      ) : (
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => setIsShowOption(true)}>
          <Image source={PlayIcon} />
        </TouchableHighlight>
      )}
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
    alignItems: 'center',
    borderWidth: borderWidth.normal,
    borderColor: 'transparent',
    paddingHorizontal: spaces.space3,
    borderRadius: borderRadius.header,
    marginBottom: spaces.space4,
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
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
  },
});
