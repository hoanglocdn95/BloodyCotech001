import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import Modal from 'react-native-modal';

const Popup = props => {
  const {
    isShowPopup,
    handleClosePopup,
    handleYesButton,
    handleNoButton,
    content,
  } = props;
  const [isShowModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isShowPopup);
  }, [isShowPopup]);

  const onPressYesButton = () => {
    handleClosePopup(false);
    handleYesButton();
  };

  const onPressNoButton = () => {
    handleClosePopup(false);
    handleNoButton();
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isShowModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onModalHide={() => handleClosePopup(false)}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{content}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            style={[styles.buttonFooter, styles.buttonLeft]}
            onPress={() => onPressYesButton()}>
            <Text style={styles.textStyle}>Có</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonFooter, styles.buttonRight]}
            onPress={() => onPressNoButton()}>
            <Text style={styles.textStyle}>Không</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.header,
    marginHorizontal: spaces.space4,
  },
  body: {
    padding: spaces.space3,
    backgroundColor: colors.white,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bodyText: {
    fontSize: fonts.medium,
    color: colors.bg_primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: spaces.space1,
    borderTopColor: 'transparent',
  },
  buttonFooter: {
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: spaces.space2,
    width: '50%',
  },
  buttonLeft: {
    borderRightWidth: spaces.space0,
    borderBottomLeftRadius: 10,
    borderRightColor: 'transparent',
  },
  buttonRight: {
    borderLeftWidth: spaces.space0,
    borderBottomRightRadius: 10,
    borderLeftColor: 'transparent',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: fonts.large,
  },
});
