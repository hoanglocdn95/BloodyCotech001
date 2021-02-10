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
import { LanguageList } from 'constants/common';
import { PlayIcon } from 'assets/icons/index';
import Checkbox from 'component/Form/Checkbox';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const SetLanguageScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  const renderListCheckbox = () => {
    return LanguageList.map((item, index) => {
      return (
        <Checkbox
          key={`${item.languageCode}_${index}`}
          handleCheckValue={() => {
            i18n.changeLanguage(item.languageCode, () => {});
          }}
          value={item.languageCode}
          label={item.title}
          valueSelected={i18n.language}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}> {t('settings.language.title')}</Text>
      <View style={styles.containerList}>{renderListCheckbox()}</View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.Welcome)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
});

export default SetLanguageScreen;

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
    marginRight: spaces.space2,
  },
  containerList: {
    marginTop: spaces.space5,
  },
  imageContainer: {
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
    position: 'absolute',
    bottom: spaces.space3,
  },
});
