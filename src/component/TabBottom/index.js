import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const TabBar = props => {
  const { navigationState, navigation, position } = props;
  return <View style={styles.container} />;
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'seashell',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
