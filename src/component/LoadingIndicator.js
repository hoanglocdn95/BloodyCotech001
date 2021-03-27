import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LoadingStore from 'stores/loadingStore';
import { colors } from 'constants/theme';

const LoadingIndicator = observer(() => {
  return (
    LoadingStore.IsShowLoading && (
      <Modal
        style={styles.modal}
        isVisible={LoadingStore.IsShowLoading}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.3}
        onModalHide={() => LoadingStore.setLoadingIndicator(false)}>
        <ActivityIndicator size="large" color={colors.white} />
      </Modal>
    )
  );
});

export default LoadingIndicator;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});
