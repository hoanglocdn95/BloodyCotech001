import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import { LanguageList } from 'constants/common';
import Checkbox from 'component/Form/Checkbox';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const SetLanguageScreen = observer(() => {
  const { t } = useTranslation();

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
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
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
