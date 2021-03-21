import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import LoadingStore from 'stores/loadingStore';

const LoadingIndicator = () => {
  return LoadingStore.IsShowLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : null;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
  },
});
