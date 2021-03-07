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
    paddingBottom: spaces.space0,
  },
  buttonFooter: {
    width: windowWidth / 2 - spaces.space1,
    height: spaces.buttonAnswer,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth.bolder,
    borderLeftWidth: borderWidth.bolder,
    borderColor: colors.black_light,
  },
  buttonLeft: {
    marginLeft: spaces.space0,
  },
  buttonRight: {
    marginHorizontal: spaces.space0,
  },
});
