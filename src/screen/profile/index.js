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

const ProfileScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}> {t('settings.language.title')}</Text>
      <Text style={styles.styleTitle}> Profile</Text>
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
