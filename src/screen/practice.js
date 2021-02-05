import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { colors, fonts, spaces } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from '../constants/route';

import WorkingSection from '../component/WorkingSection';
import AnswerButton from '../component/AnswerButton';
import PointSection from '../component/PointSection';
import Popup from '../component/Popup';

import PracticeStore from '../stores/practiceStore';
import CounterStore from '../stores/counterStore';
import CountDown from 'react-native-countdown-component';

const windowWidth = Dimensions.get('window').width;

const kPointThreshold = 10;

const PracticeScreen = observer(() => {
  const Navigate = useNavigation();
  const [result, setResult] = useState(PracticeStore.calculateResult());
  const [isShowModal, setShowModal] = useState(false);

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    PracticeStore.setFirstParameter(randomNumber(1, 9));
    PracticeStore.setSecondParameter(randomNumber(1, 9));
    PracticeStore.setThresholdPoint(PracticeStore.Point + kPointThreshold);
    setResult(PracticeStore.calculateResult());
  }, []);

  useEffect(() => {
    if (PracticeStore.Point >= PracticeStore.ThresholdPoint) {
      setShowModal(true);
    }
  }, [PracticeStore.point]);

  const pressAnswer = type => {
    const isTrue =
      PracticeStore.FirstParameter + PracticeStore.SecondParameter === result;
    CounterStore.reset();

    if ((type === 'wrong' && isTrue) || (type === 'right' && !isTrue)) {
      Navigate.navigate(StackRoute.Main.Failed);
      return;
    }
    if ((type === 'wrong' && !isTrue) || (type === 'right' && isTrue)) {
      PracticeStore.setFirstParameter(randomNumber(1, 9));
      PracticeStore.setSecondParameter(randomNumber(1, 9));
      setResult(PracticeStore.calculateResult());
      return PracticeStore.setPoint(PracticeStore.Point + 1);
    }
  };

  const reset = isResetPoint => {
    if (isResetPoint) {
      PracticeStore.setPoint(0);
    }
    PracticeStore.setFirstParameter(PracticeStore.randomNumber(1, 9));
    PracticeStore.setSecondParameter(PracticeStore.randomNumber(1, 9));
    setResult(PracticeStore.calculateResult());
  };

  const handleChangeLevel = () => {
    Navigate.goBack();
  };

  const handleIgnoreChangeLevel = () => {
    PracticeStore.setThresholdPoint(PracticeStore.Point + kPointThreshold);
  };

  return (
    <>
      <View style={styles.container}>
        <PointSection
          point={PracticeStore.Point}
          handleReset={() => reset(false)}
          handleGoBack={() => reset(true)}
          isShowHomeButton
        />
        {!!PracticeStore.PlayTime && (
          <CountDown
            id={`counter-${CounterStore.IsReset}`}
            until={PracticeStore.PlayTime}
            onFinish={() => Navigate.navigate(StackRoute.Main.Failed)}
            size={spaces.space4}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTextStyle}
          />
        )}
        <View style={styles.body}>
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={result}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer('right')}
          onWrongAnswer={() => pressAnswer('wrong')}
        />
      </View>
      <Popup
        isShowPopup={isShowModal}
        handleClosePopup={setShowModal}
        handleYesButton={handleChangeLevel}
        handleNoButton={handleIgnoreChangeLevel}
        content={
          'Bạn có cảm thấy mức độ này quá dễ và muốn chỉnh lại mức độ hay không?'
        }
      />
    </>
  );
});

export default PracticeScreen;

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
  digitTextStyle: {
    color: colors.bg_primary,
    fontSize: fonts.larger,
  },
  digitStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
    width: spaces.space9,
    height: spaces.space9,
  },
});
