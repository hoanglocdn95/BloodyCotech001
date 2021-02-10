import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { colors, fonts, spaces } from 'constants/theme';

const WorkingSection = props => {
  const { firstParameter, secondParameter, result, isCorrect } = props;
  const fadeAnim = new Animated.Value(0);
  const rotateY360deg = new Animated.Value(0);

  rotateY360deg.interpolate({
    inputRange: [0, 6],
    outputRange: ['0deg', '360deg'],
  });

  useFocusEffect(
    React.useCallback(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateY360deg, {
            toValue: 6,
            duration: 1000,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }, [fadeAnim, rotateY360deg]),
  );

  return (
    <View style={styles.expressionContainer}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>
          {firstParameter} + {secondParameter}
        </Text>
        <Text style={styles.number}>= {result}</Text>
      </View>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{ rotateY: rotateY360deg }],
          },
        ]}>
        <Text style={styles.questionMark}>{isCorrect ? '!' : '?'}</Text>
      </Animated.View>
    </View>
  );
};

export default WorkingSection;

const styles = StyleSheet.create({
  expressionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spaces.space4,
  },
  numberContainer: {
    alignItems: 'center',
  },
  number: {
    color: colors.white_milk,
    fontSize: fonts.header4,
    lineHeight: fonts.header4,
    fontWeight: 'bold',
  },
  questionMark: {
    color: 'white',
    fontSize: fonts.header6 + fonts.header4,
    lineHeight: fonts.header6 + fonts.header4,
    marginHorizontal: spaces.space4,
    fontWeight: 'bold',
  },
});
