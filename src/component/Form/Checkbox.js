import * as React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

import { fonts, colors, spaces, borderRadius } from 'constants/theme';

const Checkbox = props => {
  const { handleCheckValue, label, value, valueSelected, isDisabled } = props;
  return (
    <View style={styles.container} isDisabled={isDisabled}>
      <TouchableHighlight
        style={styles.checkboxContainer}
        onPress={() => handleCheckValue()}>
        <View
          style={[
            styles.checkedMark,
            valueSelected === value ? styles.checked : styles.unchecked,
          ]}
        />
      </TouchableHighlight>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: spaces.space1,
    backgroundColor: colors.bg_primary,
  },
  checkboxContainer: {
    width: spaces.space6,
    height: spaces.space6,
    backgroundColor: colors.white,
    borderRadius: borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedMark: {
    width: '60%',
    height: '60%',
    borderRadius: borderRadius.circle,
    backgroundColor: colors.black,
  },
  checked: {
    backgroundColor: colors.bg_primary,
  },
  unchecked: {
    backgroundColor: colors.white_milk,
  },
  label: {
    fontSize: fonts.large,
    marginLeft: spaces.space2,
    color: colors.text,
    fontWeight: 'bold',
  },
});
