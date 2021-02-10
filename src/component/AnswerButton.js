import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import { RightIcon, WrongIcon } from 'assets/icons/index';
import { colors, spaces, borderWidth } from 'constants/theme';
const windowWidth = Dimensions.get('window').width;

const AnswerButton = props => {
  const { onRightAnswer, onWrongAnswer } = props;
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.buttonLeft, styles.buttonFooter]}
        onPress={() => onRightAnswer()}>
        <Image source={RightIcon} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.buttonRight, styles.buttonFooter]}
        onPress={() => onWrongAnswer()}>
        <Image source={WrongIcon} />
      </TouchableHighlight>
    </View>
  );
};

export default AnswerButton;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: spaces.space2,
  },
  buttonFooter: {
    width: windowWidth / 2 - 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth.bolder,
    borderLeftWidth: borderWidth.bolder,
    borderColor: colors.black_light,
  },
  buttonLeft: {
    marginLeft: 10,
  },
  buttonRight: {
    marginHorizontal: 10,
  },
});
