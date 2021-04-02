import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { colors, fonts, spaces, borderRadius } from 'constants/theme';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import PopupStore from 'stores/popupStore';
import { TypePopup } from 'constants/common';

const Popup = observer(() => {
  const { t } = useTranslation();
  const {
    IsShow,
    Type,
    Content,
    CallbackYes,
    CallbackNo,
    togglePopup,
  } = PopupStore;

  const handlePressYesButton = () => {
    togglePopup(false, {});
    CallbackYes();
  };

  const handlePressNoButton = () => {
    togglePopup(false, {});
    CallbackNo();
  };

  const renderBody = (body, button) => {
    return (
      <View style={styles.container}>
        <View style={styles.body}>{body}</View>
        <View style={styles.footer}>{button}</View>
      </View>
    );
  };

  const renderContent = () => {
    switch (Type) {
      case TypePopup.CONFIRM:
        return renderBody(
          <Text style={styles.bodyText}>{Content}</Text>,
          <TouchableHighlight
            style={styles.buttonConfirm}
            onPress={() => handlePressYesButton()}>
            <Text style={styles.textStyle}>{t('component.button.ok')}</Text>
          </TouchableHighlight>,
        );
      case TypePopup.QUESTION:
        return renderBody(
          <Text style={styles.bodyText}>{Content}</Text>,
          <>
            <TouchableHighlight
              style={[styles.buttonFooter, styles.buttonLeft]}
              onPress={() => handlePressYesButton()}>
              <Text style={styles.textStyle}>{t('component.button.yes')}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.buttonFooter, styles.buttonRight]}
              onPress={() => handlePressNoButton()}>
              <Text style={styles.textStyle}>{t('component.button.no')}</Text>
            </TouchableHighlight>
          </>,
        );
      case TypePopup.NOTICE:
        return renderBody(
          <Text style={styles.bodyText}>{Content}</Text>,
          <TouchableHighlight
            style={styles.buttonConfirm}
            onPress={() => handlePressYesButton()}>
            <Text style={styles.textStyle}>{t('component.button.read')}</Text>
          </TouchableHighlight>,
        );
      default:
        return renderBody(
          <Text style={styles.bodyText}>{Content}</Text>,
          <TouchableHighlight
            style={styles.buttonConfirm}
            onPress={() => handlePressYesButton()}>
            <Text style={styles.textStyle}>{t('component.button.read')}</Text>
          </TouchableHighlight>,
        );
    }
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={IsShow}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onModalHide={() => togglePopup(false, {})}>
      {renderContent()}
    </Modal>
  );
});

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
  buttonConfirm: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: spaces.space2,
    width: '100%',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: fonts.large,
  },
});
