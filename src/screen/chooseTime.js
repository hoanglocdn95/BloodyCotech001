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
import { PlayIcon } from 'assets/icons/index';
import PracticeStore from 'stores/practiceStore';
import Checkbox from 'component/Form/Checkbox';
import { useTranslation } from 'react-i18next';

const ChooseTimeScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();
  const arrPlayTime = [
    {
      time: 0,
      description: t('arrPlayTime.noTime'),
    },
    {
      time: 45,
      description: t('arrPlayTime.beginner'),
    },
    {
      time: 30,
      description: t('arrPlayTime.junior'),
    },
    {
      time: 15,
      description: t('arrPlayTime.highJunior'),
    },
    {
      time: 10,
      description: t('arrPlayTime.adult'),
    },
    {
      time: 3,
      description: t('arrPlayTime.easyGame'),
    },
  ];

  const renderListCheckbox = () => {
    return arrPlayTime.map((item, index) => {
      return (
        <Checkbox
          key={`${item.time}_${index}`}
          handleCheckValue={() => PracticeStore.setPLayTime(item.time)}
          value={item.time}
          label={
            item.time === 0
              ? `${item.description}`
              : `${item.time} ${t('chooseTime.second')} (${item.description})`
          }
          valueSelected={PracticeStore.PlayTime}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>{t('chooseTime.chooseYourTime')}</Text>
      <View style={styles.containerList}>{renderListCheckbox()}</View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.Practice)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
});

export default ChooseTimeScreen;

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
  },
  containerList: {
    marginTop: spaces.space5,
  },
  imageContainer: {
    minWidth: spaces.imageContainer,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
    position: 'absolute',
    bottom: spaces.space3,
  },
});
