import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { colors, fonts } from 'constants/theme';
import { Right, Wrong } from 'constants/common';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';

import WorkingSection from 'component/WorkingSection';
import AnswerButton from 'component/AnswerButton';
import PointSection from 'component/PointSection';
import BattleStore from 'stores/battleStore';

const windowWidth = Dimensions.get('window').width;

const LosePoint = -5;
const WinPoint = 10;

const BattleScreen = observer(() => {
  const Navigate = useNavigation();

  useEffect(() => {
    BattleStore.getValue();
  }, []);

  function pressAnswer(type, player) {
    if (type !== BattleStore.TrueAnswer) {
      const point = BattleStore[`player${player}`].point - 1;
      BattleStore.setPoint(point, player);
      if (point <= LosePoint) {
        return Navigate.navigate(StackRoute.Main.Success);
      }
      BattleStore.getValue();
    } else {
      const point = BattleStore[`player${player}`].point + 1;
      BattleStore.setPoint(point, player);
      if (point >= WinPoint) {
        return Navigate.navigate(StackRoute.Main.Success);
      }
      BattleStore.getValue();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.player2}>
        <PointSection point={BattleStore.player2.point} isShowHomeButton />
        <View style={styles.body}>
          <WorkingSection
            firstParameter={BattleStore.FirstParameter}
            secondParameter={BattleStore.SecondParameter}
            result={BattleStore.ResultParameter}
            fontSize={fonts.header3}
            operator={BattleStore.Operator}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer(Right, 2)}
          onWrongAnswer={() => pressAnswer(Wrong, 2)}
        />
      </View>
      <View style={styles.player1}>
        <PointSection point={BattleStore.player1.point} isShowHomeButton />
        <View style={styles.body}>
          <WorkingSection
            firstParameter={BattleStore.FirstParameter}
            secondParameter={BattleStore.SecondParameter}
            result={BattleStore.ResultParameter}
            fontSize={fonts.header3a}
            operator={BattleStore.Operator}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer(Right, 1)}
          onWrongAnswer={() => pressAnswer(Wrong, 1)}
        />
      </View>
    </View>
  );
});

export default BattleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
  },
  body: {
    width: windowWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player1: {
    flex: 1,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.bg_primary,
  },
  player2: {
    flex: 1,
    transform: [{ rotate: '180deg' }],
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.bg_secondary,
  },
});
