import {observer} from 'mobx-react-lite';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {colors} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {StackRoute} from '../constants/route';

import WorkingSection from '../component/WorkingSection';
import AnswerButton from '../component/AnswerButton';
import PointSection from '../component/PointSection';
import BattleStore from '../stores/battleStore';

const windowWidth = Dimensions.get('window').width;

const BattleScreen = observer(() => {
  const Navigate = useNavigation();
  const [result, setResult] = useState(BattleStore.calculateResult());

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useEffect(() => {
    BattleStore.setFirstParameter(randomNumber(1, 9));
    BattleStore.setSecondParameter(randomNumber(1, 9));
    setResult(BattleStore.calculateResult());
  }, []);

  function pressAnswer(type, player) {
    const isTrue =
      BattleStore.FirstParameter + BattleStore.SecondParameter === result;
    BattleStore.setFirstParameter(randomNumber(1, 9));
    BattleStore.setSecondParameter(randomNumber(1, 9));
    setResult(BattleStore.calculateResult());
    if ((type === 'wrong' && isTrue) || (type === 'right' && !isTrue)) {
      const point = BattleStore[`player${player}`].point - 1;
      BattleStore.setPoint(point, player);
      if (point <= -5) {
        return Navigate.navigate(StackRoute.Main.Success);
      }
    }
    if ((type === 'wrong' && !isTrue) || (type === 'right' && isTrue)) {
      const point = BattleStore[`player${player}`].point + 1;
      BattleStore.setPoint(point, player);
      if (point >= 10) {
        return Navigate.navigate(StackRoute.Main.Success);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.player1}>
        <PointSection point={BattleStore.player1.point} isShowHomeButton />
        <View style={styles.body}>
          <WorkingSection
            firstParameter={BattleStore.FirstParameter}
            secondParameter={BattleStore.SecondParameter}
            result={result}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer('right', 1)}
          onWrongAnswer={() => pressAnswer('wrong', 1)}
        />
      </View>
      <View style={styles.player2}>
        <PointSection point={BattleStore.player2.point} isShowHomeButton />
        <View style={styles.body}>
          <WorkingSection
            firstParameter={BattleStore.FirstParameter}
            secondParameter={BattleStore.SecondParameter}
            result={result}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer('right', 2)}
          onWrongAnswer={() => pressAnswer('wrong', 2)}
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
    transform: [{rotate: '180deg'}],
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: 'green',
  },
  player2: {
    flex: 1,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: 'red',
  },
});
