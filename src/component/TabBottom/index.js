import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import { LanguageIcon } from 'assets/icons/index';
import {
  colors,
  fonts,
  spaces,
  borderRadius,
  borderWidth,
} from 'constants/theme';

const TabBar = props => {
  const { onOpenSettingLanguage } = props;
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => onOpenSettingLanguage()}>
        <Image source={LanguageIcon} style={styles.image} />
      </TouchableHighlight>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.header,
  },
  image: {
    width: 50,
    height: 50,
  },
});
